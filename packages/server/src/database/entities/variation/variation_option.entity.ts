import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Variation } from './variation.entity';
import { ProductItem } from '../product/product_item.entity';

@Entity()
export class VariationOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => Variation, variation => variation.options, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  variation: Variation;

  @ManyToMany(() => ProductItem, (item) => item.variations)
  product_items: ProductItem[]
}