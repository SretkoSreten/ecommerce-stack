import { InjectRepository } from '@nestjs/typeorm';
import { ShopOrder } from '../../entities/order/order.entity';
import { OrderLine } from '../../entities/order/order_line.entity';
import { ProductItem } from '../../entities/product/product_item.entity';
import { Repository } from 'typeorm';;

export class OrderLineSeeder {
    constructor(
        @InjectRepository(OrderLine)
        private readonly orderLineRepository: Repository<OrderLine>,
        @InjectRepository(ProductItem)
        private readonly productRepository: Repository<ProductItem>,
        @InjectRepository(ShopOrder)
        private readonly shopOrderRepository: Repository<ShopOrder>,
    ) {}

    async seed(){
        const count: number = await this.orderLineRepository.count();
        const ORDER_COUNT: number = 50;
        const GENERATE_COUNT = ORDER_COUNT - count;
        await this.seedOrders(GENERATE_COUNT);
    }

    async seedOrders(numItems: number): Promise<void> {
        const products = await this.productRepository.find();
        const orders = await this.shopOrderRepository.find();

        if (products.length === 0 || orders.length === 0) {
            console.log("No products or orders found in the repository.");
            return;
        }

        for (let i = 0; i < numItems; i++) {
            const product = this.getRandomElement(products);
            const order = this.getRandomElement(orders);

            if (!product || !order) {
                console.log("Could not find product or order to create OrderLine.");
                continue;
            }

            const qty = Math.floor(Math.random() * 10) + 1; // Generate random quantity
            const price = parseFloat((Math.random() * 100).toFixed(2)); // Generate random price

            const orderLine = new OrderLine();
            orderLine.product = product;
            orderLine.order = order;
            orderLine.qty = qty;
            orderLine.price = price;

            await this.orderLineRepository.save(orderLine);
        }
    }

    private getRandomElement<T>(array: T[]): T | undefined {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}
