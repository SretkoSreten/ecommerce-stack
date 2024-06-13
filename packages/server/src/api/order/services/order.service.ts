import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Coupon } from "src/database/entities/coupon/coupon.entity";
import { ShopOrder } from "src/database/entities/order/order.entity";
import { User } from "src/database/entities/user/user.entity";
import { errorMessages } from "src/errors/custom";
import { EntityManager, Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UserPaymentMethod } from "src/database/entities/payment/user-payment-method.entity";
import { ShippingMethod } from "src/database/entities/ship_method/ship_method.entity";
import { OrderStatus } from "src/database/entities/order/order_status.entity";
import { Address } from "src/database/entities/address/address.entity";
import { ShoppingCart } from "src/database/entities/cart/cart.entity";
import { OrderLine } from "src/database/entities/order/order_line.entity";
import { calcWithShippingPrice } from "src/common/helper/calcCart";
import { StatusType } from "src/constants/status.constants";
import { successObject } from "src/common/helper/sucess-response.interceptor";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(ShopOrder)
    private readonly orderRepository: Repository<ShopOrder>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(OrderStatus)
    private readonly statusRepository: Repository<OrderStatus>,
    private readonly entityManager: EntityManager
  ) {}

  async getOrder(id: number): Promise<ShopOrder> {
    const order: ShopOrder = await this.orderRepository.findOne({
      where: { id },
      relations: [
        "coupon",
        "orderLines",
        "orderLines.product",
        "payment_method",
        "shipping_address",
        "orderLines.product.product",
        "orderStatus",
        "shippingMethod"
      ],
    });

    if (!order) {
      throw new NotFoundException(errorMessages.order.notFound);
    }

    return order;
  }

  async getUserOrder(user: User, query: any): Promise<ShopOrder[]> {
    let orders: ShopOrder[];

    if (query.status) {
      const orderStatus = await this.statusRepository.findOne({
        where: { status: query.status },
      });

      if (orderStatus) {
        orders = await this.orderRepository.find({
          where: { user, orderStatus },
          relations: ["coupon", "orderLines", "orderStatus"],
        });
      } else {
        orders = await this.orderRepository.find({
          where: { user },
          relations: ["coupon", "orderLines", "orderStatus"],
        });
      }
    } else {
      orders = await this.orderRepository.find({
        where: { user },
        relations: ["coupon", "orderLines", "orderStatus"],
      });
    }

    return orders;
  }

  async cancelOrder(user: User, orderId: number) {
    const orderStatus = await this.statusRepository.findOne({
      where: { status: StatusType.CANCELLED },
    });
    await this.orderRepository.update({ id: orderId, user }, { orderStatus });
    return successObject;
  }

  public async createOrder(
    user: User,
    data: CreateOrderDto
  ): Promise<ShopOrder> {
    return await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        // Find the shipping method, order status, and payment method
        const [shippingMethod, orderStatus, paymentMethod] = await Promise.all([
          transactionalEntityManager.findOneOrFail(ShippingMethod, {
            where: { id: data.shipMethodId },
          }),
          transactionalEntityManager.findOneOrFail(OrderStatus, {
            where: { status: "Pending" },
          }),
          transactionalEntityManager.findOneOrFail(UserPaymentMethod, {
            where: { id: data.paymentMethodId },
          }),
        ]);

        // Create the shipping address
        const shippingAddress = await this.createAddress(
          transactionalEntityManager,
          data.addressId
        );

        // Find the user's shopping cart
        const cart = await transactionalEntityManager.findOneOrFail(
          ShoppingCart,
          {
            where: { user },
            relations: ["items", "coupon", "items.productItem"],
          }
        );

        // Create and save the order lines
        const orderLines = cart.items.map((cartItem) => {
          return transactionalEntityManager.create(OrderLine, {
            product: cartItem.productItem,
            quantity: cartItem.qty,
            price: cartItem.productItem.price * cartItem.qty,
          });
        });

        // Calculate total amount based on order lines and apply coupon
        const totalAmount = orderLines.reduce(
          (total, orderLine) => total + orderLine.price,
          0
        );
        const finalAmount = calcWithShippingPrice(
          totalAmount,
          cart.coupon,
          shippingMethod
        );

        // Create the ShopOrder entity
        const order = transactionalEntityManager.create(ShopOrder, {
          user,
          shippingMethod,
          orderStatus,
          payment_method: paymentMethod,
          shipping_address: shippingAddress,
          coupon: cart.coupon,
          order_total: finalAmount,
        });

        // Save the ShopOrder entity
        const savedOrder = await transactionalEntityManager.save(order);

        // Associate order lines with the saved order
        await Promise.all(
          orderLines.map((orderLine) => {
            orderLine.order = savedOrder;
            return transactionalEntityManager.save(orderLine);
          })
        );

        return savedOrder;
      }
    );
  }

  private async createAddress(
    transactionalEntityManager: EntityManager,
    addressData: any
  ): Promise<Address> {
    const address = transactionalEntityManager.create(Address, addressData);
    return await transactionalEntityManager.save(address);
  }

  async applyCoupon(orderId: number, couponCode: string): Promise<ShopOrder> {
    const coupon: Coupon = await this.couponRepository.findOneBy({
      code: couponCode,
    });
    const order: ShopOrder = await this.orderRepository.findOneBy({
      id: orderId,
    });
    const discount = coupon.discount;

    if (!coupon.isActive) {
      throw new NotFoundException(errorMessages.coupon.notActive);
    }

    order.coupon = coupon;
    order.order_total =
      order.order_total - order.order_total * (discount / 100);
    await this.orderRepository.save(order);
    return order;
  }
}
