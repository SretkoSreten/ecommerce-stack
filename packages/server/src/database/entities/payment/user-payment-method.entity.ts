import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { PaymentType } from './payment.entity';
import { ShopOrder } from '../order/order.entity';

@Entity()
export class UserPaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;
  
  @Column()
  account_name?: string;

  @Column({ unique: true, nullable: true }) // Stripe Customer ID can be nullable initially
  payment_method_id: string;

  @Column()
  card_number?: string;

  @Column()
  expiry_date?: string;

  @Column({ default: false })
  is_default: boolean;

  @ManyToOne(() => User, user => user.paymentMethods, { nullable: false, onUpdate: 'NO ACTION' })
  user: User;

  @ManyToOne(() => PaymentType, paymentType => paymentType.userPaymentMethods, { nullable: true, onUpdate: 'NO ACTION', onDelete: 'SET NULL' })
  paymentType: PaymentType;

  @OneToMany(() => ShopOrder, order => order.payment_method)
  orders: ShopOrder[];
}

