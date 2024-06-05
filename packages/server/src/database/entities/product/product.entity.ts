import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';import { Category } from '../category/category.entity';
import { ProductItem } from './product_item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, category => category.products, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  category: Category;

  @OneToMany(() => ProductItem, product_item => product_item.product)
  product_items: ProductItem[];
}
