import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "../user/user.entity";
import { UserPaymentMethod } from "../payment/user-payment-method.entity";
import { Address } from "../address/address.entity";
import { Coupon } from "../coupon/coupon.entity";
import { ShippingMethod } from "../ship_method/ship_method.entity";
import { OrderStatus } from "./order_status.entity";
import { OrderLine } from "./order_line.entity";

@Entity()
export class ShopOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  order_date: Date;

  @Column({ type: "timestamp", nullable: true }) // Adding delivery_date field
  delivery_date: Date; // Adjust type as per your specific requirements

  @ManyToOne(() => UserPaymentMethod, (paymentType) => paymentType.orders, {
    nullable: true,
    onDelete: "SET NULL",
  })
  payment_method: UserPaymentMethod;

  @ManyToOne(() => Address, { nullable: true, onDelete: "SET NULL" })
  shipping_address: Address;

  @ManyToOne(() => ShippingMethod, { nullable: false }) // Define many-to-one relationship with ShippingMethod
  shippingMethod: ShippingMethod;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  order_total: number;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 2 })
  final_total: number;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 2 })
  discount_amount?: number;

  @ManyToOne(() => Coupon, { nullable: true })
  coupon: Coupon;

  @ManyToOne(() => OrderStatus, { nullable: false }) // Define many-to-one relationship with OrderStatus
  orderStatus: OrderStatus;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];
}
