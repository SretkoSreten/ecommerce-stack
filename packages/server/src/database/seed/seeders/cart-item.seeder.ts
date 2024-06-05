import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from 'src/database/entities/cart/cart.entity';
import { ShoppingCartItem } from 'src/database/entities/cart/cart_item.entity';
import { ProductItem } from 'src/database/entities/product/product_item.entity';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class ShoppingCartItemSeeder {
  constructor(
    @InjectRepository(ShoppingCartItem)
    private readonly shoppingCartItemRepository: Repository<ShoppingCartItem>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(ProductItem)
    private readonly productItemRepository: Repository<ProductItem>,
    private readonly entityManager: EntityManager,
  ) {}

  private generateRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  private async generateShoppingCartItemData(
    shoppingCarts: ShoppingCart[],
    productItems: ProductItem[],
  ): Promise<Partial<ShoppingCartItem>> {
    const cart = this.generateRandomElement(shoppingCarts);
    const productItem = this.generateRandomElement(productItems);
    const qty = Math.floor(Math.random() * 10) + 1;

    return {
      cart,
      productItem,
      qty
    };
  }

  async seed(){
    const count: number = await this.shoppingCartItemRepository.count();
    const CATEGORY_COUNT: number = 100;
    const GENERATE_COUNT = CATEGORY_COUNT - count;
    await this.seedShoppingCartItems(GENERATE_COUNT);
  }

  async seedShoppingCartItems(numItems: number) {
    const shoppingCarts = await this.shoppingCartRepository.find();
    const productItems = await this.productItemRepository.find();

    for (let i = 0; i < numItems; i++) {
      const shoppingCartItemData = await this.generateShoppingCartItemData(shoppingCarts, productItems);
      await this.entityManager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.upsert(ShoppingCartItem, shoppingCartItemData, {conflictPaths: ['id']});
      });
    }
  }
}
