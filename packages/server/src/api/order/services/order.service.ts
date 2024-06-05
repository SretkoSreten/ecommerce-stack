import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { AddressService } from "src/api/address/services/address.service";
import { Coupon } from "src/database/entities/coupon/coupon.entity";
import { ShopOrder } from "src/database/entities/order/order.entity";
import { User } from "src/database/entities/user/user.entity";
import { errorMessages } from "src/errors/custom";
import { EntityManager, Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { PaymentType } from "src/database/entities/payment/payment.entity";
import { UserPaymentMethod } from "src/database/entities/payment/user-payment-method.entity";
import { ShippingMethod } from "src/database/entities/ship_method/ship_method.entity";
import { OrderStatus } from "src/database/entities/order/order_status.entity";
import { Address } from "src/database/entities/address/address.entity";
import { ShoppingCart } from "src/database/entities/cart/cart.entity";
import { OrderLine } from "src/database/entities/order/order_line.entity";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(ShopOrder)
        private readonly orderRepository: Repository<ShopOrder>,
        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>,
        private readonly entityManager: EntityManager,
    ) { }

    async getOrder(id: number): Promise<ShopOrder> {
        const order: ShopOrder = await this.orderRepository.findOne({
            where: { id },
            relations: ['coupon', 'orderLines', 'orderLines.product']
        })

        if (!order) {
            throw new NotFoundException(errorMessages.order.notFound);
        }

        return order;
    }

    async getUserOrder(user: User): Promise<ShopOrder[]> {
        const orders: ShopOrder[] = await this.orderRepository.find({
            where: { user },
            relations: ['coupon', 'orderLines', 'orderLines.product']
        })

        if (!orders) {
            throw new NotFoundException(errorMessages.order.notFound);
        }

        return orders;
    }

    public async createOrder(user: User, data: CreateOrderDto): Promise<ShopOrder> {
        return await this.entityManager.transaction(async transactionalEntityManager => {
            // Find the shipping method
            const shippingMethod = await transactionalEntityManager.findOne(ShippingMethod, { where: { name: data.shipping_method.name } });
            if (!shippingMethod) {
                throw new NotFoundException('Shipping method not found');
            }

            // Find the order status
            const orderStatus = await transactionalEntityManager.findOne(OrderStatus, { where: { status: data.status } });
            if (!orderStatus) {
                throw new NotFoundException('Order status not found');
            }

            // Create the shipping address
            const createdAddress = await this.createAddress(transactionalEntityManager, data.shipping_address);

            // Find the payment method
            const paymentMethod = await transactionalEntityManager.findOne(UserPaymentMethod, { where: { id: data.paymentMethodId } });
            if (!paymentMethod) {
                throw new NotFoundException('Payment method not found');
            }

            // Create the ShopOrder entity
            const order = transactionalEntityManager.create(ShopOrder, {
                user,
                shippingMethod,
                orderStatus,
                payment_method: paymentMethod,
                shipping_address: createdAddress,
                order_status: data.status
            });

            // Save the ShopOrder entity to get its ID
            const savedOrder = await transactionalEntityManager.save(order);

            // Find the user's shopping cart
            const cart = await transactionalEntityManager.findOne(ShoppingCart, { where: { user }, relations: ['items', 'items.productItem'] });
            if (!cart || !cart.items.length) {
                throw new NotFoundException('Shopping cart is empty');
            }

            // Create and save the order lines
            const orderLines = cart.items.map(cartItem => {
                return transactionalEntityManager.create(OrderLine, {
                    product: cartItem.productItem,
                    quantity: cartItem.qty,
                    price: cartItem.productItem.price * cartItem.qty,
                    order: savedOrder,
                });
            });

            // Save all order lines
            await transactionalEntityManager.save(orderLines);

            return savedOrder;
        });
    }

    private async createAddress(transactionalEntityManager: EntityManager, addressData: any): Promise<Address> {
        const address = transactionalEntityManager.create(Address, addressData);
        return await transactionalEntityManager.save(address);
    }

    async applyCoupon(orderId: number, couponCode: string): Promise<ShopOrder> {
        const coupon: Coupon = await this.couponRepository.findOneBy({ code: couponCode });
        const order: ShopOrder = await this.orderRepository.findOneBy({ id: orderId });
        const discount = coupon.discount;

        if (!coupon.isActive) {
            throw new NotFoundException(errorMessages.coupon.notActive);
        }

        order.coupon = coupon;
        order.order_total = order.order_total - (order.order_total * (discount / 100));
        await this.orderRepository.save(order);
        return order;
    }
}