import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { ShoppingCartItem } from './cart_item.entity';
import { Coupon } from '../coupon/coupon.entity';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.shoppingCarts, { nullable: false, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Coupon, { nullable: true })
  coupon: Coupon;

  @OneToMany(() => ShoppingCartItem, item => item.cart)
  items: ShoppingCartItem[];
}
