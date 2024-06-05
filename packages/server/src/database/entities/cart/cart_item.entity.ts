import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ShoppingCart } from './cart.entity';
import { ProductItem } from '../product/product_item.entity';

@Entity()
export class ShoppingCartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  qty: number;

  @ManyToOne(() => ShoppingCart, cart => cart.items, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  cart: ShoppingCart;

  @ManyToOne(() => ProductItem, productInventory => productInventory.shoppingCartItems, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  productItem: ProductItem;
}
