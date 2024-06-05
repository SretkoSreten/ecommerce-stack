import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ShopOrder } from '../order/order.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column('decimal', { precision: 10, scale: 2 })
  discount: number;

  @Column({ type: 'timestamp' })
  expire: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ShopOrder, order => order.coupon)
  orders: ShopOrder[];
}
