import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Address } from './address.entity';
import { User } from '../user/user.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  is_default: boolean;

  @ManyToOne(() => User, user => user.userAddresses)
  user: User; 

  @ManyToOne(() => Address, address => address.userAddresses)
  address: Address;
}