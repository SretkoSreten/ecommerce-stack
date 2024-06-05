import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Product } from './product.entity';
import { ShoppingCartItem } from '../cart/cart_item.entity';
import { OrderLine } from '../order/order_line.entity';
import { Variation } from '../variation/variation.entity';
import { VariationOption } from '../variation/variation_option.entity';

@Entity()
export class ProductItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  SKU: string;

  @Column('int')
  qty_in_stock: number;

  @Column({ nullable: true })
  product_image: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Product, product => product.product_items, { nullable: false, onDelete: 'CASCADE' })
  product: Product;

  @OneToMany(() => ShoppingCartItem, item => item.productItem)
  shoppingCartItems: ShoppingCartItem[]; 

  @ManyToMany(() => VariationOption, (variation) => variation.product_items)
  @JoinTable({
    name: 'product_conf', // Custom join table name
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'variationOptionId',
      referencedColumnName: 'id',
    },
  })
  variations: VariationOption[]

  @OneToMany(() => OrderLine, orderLine => orderLine.product)
  orderLines: OrderLine[];
}