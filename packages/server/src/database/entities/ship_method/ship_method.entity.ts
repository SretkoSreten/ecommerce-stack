import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ShopOrder } from '../order/order.entity';

@Entity()
export class ShippingMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;
    // You can add other attributes as needed

    @OneToMany(() => ShopOrder, order => order.shippingMethod)
    orders: ShopOrder[];
}