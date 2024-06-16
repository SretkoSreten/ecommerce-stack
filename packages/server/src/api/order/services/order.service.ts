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
import { calcDiscountAmount } from "src/common/helper/calcCart";
import { StatusType } from "src/constants/status.constants";
import { successObject } from "src/common/helper/sucess-response.interceptor";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { CartService } from "src/api/cart/services/cart.service";

@Injectable()
export class OrderService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(ShopOrder)
    private readonly orderRepository: Repository<ShopOrder>,
    @InjectRepository(OrderLine)
    private readonly orderLineRepository: Repository<OrderLine>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(OrderStatus)
    private readonly statusRepository: Repository<OrderStatus>,
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
    private readonly cartService: CartService
  ) {
    const stripeSecretKey = this.configService.get<string>("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not defined");
    }
    this.stripe = new Stripe(stripeSecretKey);
  }

  async orderAgain(user: User, id: number) {
    // Retrieve the existing order by its ID
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: [
        "orderLines",
        "shipping_address",
        "shippingMethod",
        "payment_method",
        "orderLines.product",
        "orderLines.order",
      ],
    });

    // Throw an exception if the order is not found
    if (!order) {
      throw new NotFoundException(errorMessages.order.notFound);
    }

    // Retrieve the status for the new order
    const status = await this.statusRepository.findOne({
      where: { status: StatusType.PREORDER },
    });

    // Create a new order object
    const newOrder = this.orderRepository.create({
      final_total: order.final_total,
      discount_amount: order.discount_amount,
      order_total: order.order_total,
      delivery_date: order.delivery_date,
      user, // Associate the new order with the user
      orderStatus: status, // Update the status for the new order
      shipping_address: order.shipping_address,
      shippingMethod: order.shippingMethod,
      payment_method: order.payment_method,
      coupon: order.coupon,
    });

    // Save the new order to the repository first to get a valid new order ID
    await this.orderRepository.save(newOrder);

    // Map and create new order lines, ensuring to use the newOrder.id
    for (const item of order.orderLines) {
      const newItem = this.orderLineRepository.create({
        ...item,
        id: undefined, // Ensure new IDs are generated for order items
        order: newOrder, // Associate the newItem with the newOrder
      });
      await this.orderLineRepository.save(newItem);
    }

    // Save the new order to the repository first to get a valid new order ID
    await this.orderRepository.save(newOrder);

    return newOrder;
  }

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
        "shippingMethod",
        "payment_method.paymentType",
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
          order: {
            order_date: "DESC", // Sort by createdAt field in descending order
          },
        });
      } else {
        orders = await this.orderRepository.find({
          where: { user },
          relations: ["coupon", "orderLines", "orderStatus"],
          order: {
            order_date: "DESC", // Sort by createdAt field in descending order
          },
        });
      }
    } else {
      orders = await this.orderRepository.find({
        where: { user },
        relations: ["coupon", "orderLines", "orderStatus"],
        order: {
          order_date: "DESC", // Sort by createdAt field in descending order
        },
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

  public async createOrder(user: User, data: CreateOrderDto): Promise<ShopOrder> {
    return this.entityManager.transaction(async (transactionalEntityManager) => {
      // Find the necessary entities
      const [shippingMethod, orderStatus, paymentMethod] = await Promise.all([
        transactionalEntityManager.findOneOrFail(ShippingMethod, { where: { id: data.shipMethodId } }),
        transactionalEntityManager.findOneOrFail(OrderStatus, { where: { status: StatusType.PREORDER } }),
        transactionalEntityManager.findOneOrFail(UserPaymentMethod, { where: { id: data.paymentMethodId } }),
      ]);
  
      if (!paymentMethod.payment_method_id) {
        throw new NotFoundException("Valid payment method is required.");
      }
  
      const shippingAddress = await this.createAddress(transactionalEntityManager, data.addressId);
  
      const cart = await transactionalEntityManager.findOneOrFail(ShoppingCart, {
        where: { user },
        relations: ["items", "coupon", "items.productItem"],
      });
  
      // Create order lines and calculate totals
      const orderLines = cart.items.map(cartItem =>
        transactionalEntityManager.create(OrderLine, {
          product: cartItem.productItem,
          qty: cartItem.qty,
          price: cartItem.productItem.price * cartItem.qty,
        })
      );
  
      const totalAmount = orderLines.reduce((total, orderLine) => total + orderLine.price, 0);
      const discountAmount = calcDiscountAmount(totalAmount, cart.coupon);

      if (isNaN(totalAmount) || isNaN(discountAmount) || isNaN(shippingMethod.price)) {
        throw new Error("Invalid calculation for total amount, discount, or shipping price.");
      }
  
      const finalAmount = totalAmount - discountAmount + parseFloat(shippingMethod.price.toString());
  
      if (isNaN(finalAmount)) {
        throw new Error("Invalid final amount calculation.");
      }
  
      // Create and save the order
      const order = transactionalEntityManager.create(ShopOrder, {
        user,
        shippingMethod,
        orderStatus,
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
        coupon: cart.coupon,
        order_total: totalAmount,
        discount_amount: discountAmount,
        final_total: finalAmount,
      });
  
      const savedOrder = await transactionalEntityManager.save(order);
  
      // Save order lines with the associated order
      await Promise.all(orderLines.map(orderLine => {
        orderLine.order = savedOrder;
        return transactionalEntityManager.save(orderLine);
      }));
  
      // Process payment with Stripe
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(finalAmount * 100), // Stripe requires amount in cents
        currency: "usd",
        customer: user.stripeCustomerId,
        payment_method: paymentMethod.payment_method_id,
        description: `Order #${savedOrder.id} Payment`,
        confirm: true,
        return_url: this.configService.get<string>("RETURN_URL"),
      });
  
      await this.cartService.clearCart(user);
      await this.cartService.removeCoupon(user);
  
      if (paymentIntent.status !== "succeeded") {
        throw new NotFoundException("Payment processing failed.");
      }
  
      return savedOrder;
    });
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
