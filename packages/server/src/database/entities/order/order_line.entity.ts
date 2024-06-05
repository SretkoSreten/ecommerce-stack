import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity';
import { ShopOrder } from './order.entity';
import { UserReview } from '../review/review.entity';
import { ProductItem } from '../product/product_item.entity';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductItem, { nullable: false, onDelete: 'CASCADE' })
  product: ProductItem;

  @ManyToOne(() => ShopOrder, order => order.orderLines, { nullable: false, onDelete: 'CASCADE'})
  order: ShopOrder;

  @Column()
  qty: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => UserReview, review => review.orderLine, {nullable: false})
  reviews: UserReview[]
}
