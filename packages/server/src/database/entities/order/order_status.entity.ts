import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ShopOrder } from './order.entity';

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @OneToMany(() => ShopOrder, order => order.orderStatus)
    orders: ShopOrder[];
}