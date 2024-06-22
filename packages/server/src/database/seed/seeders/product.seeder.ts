import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Product } from '../../entities/product/product.entity';
import { ProductItem } from '../../entities/product/product_item.entity';
import { Category } from '../../entities/category/category.entity';
import { VariationOption } from '../../entities/variation/variation_option.entity';

@Injectable()
export class ProductSeeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductItem)
    private readonly productItemRepository: Repository<ProductItem>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(VariationOption)
    private readonly variationRepository: Repository<VariationOption>,
    private readonly entityManager: EntityManager,
  ) {}

  async seed() {
    await this.seedProductsAndItems();
  }

  private async generateProductData(
    categories: Category[],
  ): Promise<Partial<Product>> {
    const category: Category =
      categories[Math.floor(Math.random() * categories.length)];
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: category,
    };
  }

  private async generateProductItemData(
    product: Product,
    variations: VariationOption[],
  ): Promise<Partial<ProductItem>> {
    const images = [
      'https://res.cloudinary.com/publicproject/image/upload/v1719096450/ecommerce/spfThree_mqdjx4.webp',
      'https://res.cloudinary.com/publicproject/image/upload/v1719096450/ecommerce/bestSellerFour_kyr1ys.webp',
      'https://res.cloudinary.com/publicproject/image/upload/v1719096450/ecommerce/newArrOne_w1vn8b.webp',
      'https://res.cloudinary.com/publicproject/image/upload/v1719096450/ecommerce/spfTwo_e58buh.webp',
      'https://res.cloudinary.com/publicproject/image/upload/v1719096450/ecommerce/newArrTwo_dkhoad.webp',
      'https://res.cloudinary.com/publicproject/image/upload/v1719096450/ecommerce/bestSellerOne_ejzm6n.webp',
      'https://res.cloudinary.com/publicproject/image/upload/v1719096450/ecommerce/bestSellerTwo_oh7gk3.webp',
      'https://res.cloudinary.com/publicproject/image/upload/v1719096450/ecommerce/spfFour_ax2gos.webp'
    ];

    const image = images[Math.floor(Math.random() * images.length)];

    const data: any = {
      SKU: faker.random.alphaNumeric(10),
      qty_in_stock: faker.datatype.number(100),
      product_image: image,
      price: faker.datatype.number({ min: 10, max: 1000, precision: 0.01 }),
      product: product,
      variations: [],
    };

    for (let i = 0; i < 10; i++) {
      const randomVariation: VariationOption = variations[i];
      data.variations.push(randomVariation);
    }

    return data;
  }

  async seedProductsAndItems() {
    const countProducts: number = await this.productRepository.count();
    const countProductItems: number = await this.productItemRepository.count();
    const PRODUCT_COUNT: number = 200;
    const GENERATE_PRODUCT_COUNT = PRODUCT_COUNT - countProducts;
    const GENERATE_PRODUCT_ITEM_COUNT = PRODUCT_COUNT - countProductItems;

    const categories = await this.categoryRepository.find();
    const variations = await this.variationRepository.find();

    // Seed products
    for (let i = 0; i < GENERATE_PRODUCT_COUNT; i++) {
      const productData = await this.generateProductData(categories);
      await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.upsert(Product, productData, {
            conflictPaths: ['name'],
          });
        },
      );
    }

    // Seed product items
    const products = await this.productRepository.find();
    for (let i = 0; i < GENERATE_PRODUCT_ITEM_COUNT; i++) {
      const randomProduct: Product =
        products[Math.floor(Math.random() * products.length)];
      const productItemData = await this.generateProductItemData(
        randomProduct,
        variations,
      );
      await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.save(ProductItem, productItemData);
        },
      );
    }
  }
}
