import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ShopOrder } from "../order/order.entity";
import { ShoppingCart } from "../cart/cart.entity";

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column("decimal", { precision: 10, scale: 2 })
  discount: number;

  @Column({ type: "timestamp", nullable: true }) // Allow null values and do not set a default value
  expire: Date | null;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: "text", nullable: true }) 
  description: string;

  @Column({ type: "enum", enum: ["percentage", "fixed_amount"] })
  discountType: "percentage" | "fixed_amount";

  @Column({ type: "timestamp", nullable: true })
  startDate: Date;

  @Column({ type: "int", nullable: true })
  usageLimit: number;

  @Column({ type: "int", default: 0 })
  usageCount: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  minOrderValue: number;

  @OneToMany(() => ShopOrder, (order) => order.coupon)
  orders: ShopOrder[];

  @OneToMany(() => ShoppingCart, (cart) => cart.coupon)
  carts: ShoppingCart[];
}
