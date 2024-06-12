import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ShopOrder } from 'src/database/entities/order/order.entity';
import { User } from 'src/database/entities/user/user.entity';
import { UserPaymentMethod } from 'src/database/entities/payment/user-payment-method.entity';
import { Address } from 'src/database/entities/address/address.entity';
import { ShippingMethod } from 'src/database/entities/ship_method/ship_method.entity';
import { Coupon } from 'src/database/entities/coupon/coupon.entity';
import { OrderStatus } from 'src/database/entities/order/order_status.entity';

@Injectable()
export class ShopOrderSeeder {
    constructor(
        @InjectRepository(ShopOrder)
        private readonly shopOrderRepository: Repository<ShopOrder>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserPaymentMethod)
        private readonly userPaymentMethodRepository: Repository<UserPaymentMethod>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(ShippingMethod)
        private readonly shippingMethodRepository: Repository<ShippingMethod>,
        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>,
        @InjectRepository(OrderStatus)
        private readonly orderStatusRepository: Repository<OrderStatus>,
        private readonly entityManager: EntityManager,
    ) { }

    private generateRandomDate(): Date {
        return faker.date.past();
    }

    private async getRandomRecord<T>(repository: Repository<T>): Promise<T> {
        // Fetch all items from the repository
        const items = await repository.find();

        if (items.length === 0) {
            return undefined; // Return undefined if there are no items in the repository
        }

        // Generate a random index between 0 and the length of items array
        const randomIndex = Math.floor(Math.random() * items.length);

        // Retrieve the item at the random index
        const randomItem = items[randomIndex];

        return randomItem;
    }

    async seed() {
        const count: number = await this.shopOrderRepository.count();
        const ORDER_COUNT: number = 20;
        const GENERATE_COUNT = ORDER_COUNT - count;
        await this.seedShopOrders(GENERATE_COUNT);
    }

    private async generateOrderData(): Promise<Partial<ShopOrder>> {
        const [user, paymentMethod, address, shippingMethod, coupon, orderStatus] = await Promise.all([
            this.getRandomRecord(this.userRepository),
            this.getRandomRecord(this.userPaymentMethodRepository),
            this.getRandomRecord(this.addressRepository),
            this.getRandomRecord(this.shippingMethodRepository),
            this.getRandomRecord(this.couponRepository),
            this.getRandomRecord(this.orderStatusRepository),
        ]);

        return {
            user,
            order_date: this.generateRandomDate(),
            payment_method: paymentMethod,
            shipping_address: address,
            shippingMethod,
            coupon,
            order_total: parseFloat(faker.finance.amount()),
            orderStatus,
        };
    }

    async seedShopOrders(numShopOrders: number) {
        for (let i = 0; i < numShopOrders; i++) {
            const orderData = await this.generateOrderData();

            await this.entityManager.transaction(async (transactionalEntityManager) => {
                const newShopOrder = transactionalEntityManager.create(ShopOrder, orderData);
                await transactionalEntityManager.save(newShopOrder);
            });
        }
    }
}
