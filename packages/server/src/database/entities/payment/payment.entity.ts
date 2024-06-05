import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserPaymentMethod } from './user-payment-method.entity';

@Entity()
export class PaymentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => UserPaymentMethod, userPaymentMethod => userPaymentMethod.paymentType)
  userPaymentMethods: UserPaymentMethod[];
}
