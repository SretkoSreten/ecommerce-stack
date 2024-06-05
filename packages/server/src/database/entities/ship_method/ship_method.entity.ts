import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ShopOrder } from '../order/order.entity';

@Entity()
export class ShippingMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;
    // You can add other attributes as needed

    @OneToMany(() => ShopOrder, order => order.shippingMethod)
    orders: ShopOrder[];
}