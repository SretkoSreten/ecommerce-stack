import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { OrderLine } from '../order/order_line.entity';

@Entity()
export class UserReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderLine, orderLine => orderLine.reviews, {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'order_line_id' })
  orderLine: OrderLine;

  @Column() 
  rating_value: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, user => user.reviews, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'user_id' }) 
  user: User;
}
 