import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { UserAddress } from '../address/user-address.entity';
import { UserPaymentMethod } from '../payment/user-payment-method.entity';
import { ShoppingCart } from '../cart/cart.entity';
import { ShopOrder } from '../order/order.entity';
import { UserReview } from '../review/review.entity';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true }) // Stripe Customer ID can be nullable initially
  stripeCustomerId: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ unique: true })
  fullname: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role', // Custom join table name
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
  })
  roles: Role[]

  @OneToMany(() => UserAddress, userAddress => userAddress.user, { onDelete: 'CASCADE' })
  userAddresses: UserAddress[];

  @OneToMany(() => UserPaymentMethod, paymentMethod => paymentMethod.user, { onDelete: 'CASCADE' })
  paymentMethods: UserPaymentMethod[];

  @OneToMany(() => ShoppingCart, shoppingCart => shoppingCart.user, { onDelete: 'CASCADE' })
  shoppingCarts: ShoppingCart[];

  @OneToMany(() => ShopOrder, order => order.user, { onDelete: 'CASCADE' })
  orders: ShopOrder[];

  @OneToMany(() => UserReview, review => review.user, { onDelete: 'CASCADE' })
  reviews: UserReview[];
}
