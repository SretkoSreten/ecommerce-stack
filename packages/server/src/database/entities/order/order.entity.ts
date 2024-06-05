import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { UserPaymentMethod } from '../payment/user-payment-method.entity';
import { Address } from '../address/address.entity';
import { Coupon } from '../coupon/coupon.entity';
import { ShippingMethod } from '../ship_method/ship_method.entity';
import { OrderStatus } from './order_status.entity';
import { OrderLine } from './order_line.entity';


@Entity()
export class ShopOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders, { nullable: false })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @ManyToOne(() => UserPaymentMethod, paymentType => paymentType.orders, { nullable: false })
  payment_method: UserPaymentMethod;

  @ManyToOne(() => Address, { nullable: false })
  shipping_address: Address;

  @ManyToOne(() => ShippingMethod, { nullable: false }) // Define many-to-one relationship with ShippingMethod
  shippingMethod: ShippingMethod;

  @Column()
  order_status: string;

  @Column({ nullable: true })
  coupon_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  order_total: number;

  @ManyToOne(() => Coupon, { nullable: true })
  coupon: Coupon;

  @ManyToOne(() => OrderStatus, { nullable: false }) // Define many-to-one relationship with OrderStatus
  orderStatus: OrderStatus;

  @OneToMany(() => OrderLine, orderLine => orderLine.order)
  orderLines: OrderLine[];
}
