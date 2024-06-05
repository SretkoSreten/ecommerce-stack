import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Product } from 'src/database/entities/product/product.entity';
import { ProductItem } from 'src/database/entities/product/product_item.entity';
import { Category } from 'src/database/entities/category/category.entity';

@Injectable()
export class ProductSeeder {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductItem)
        private readonly productItemRepository: Repository<ProductItem>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        private readonly entityManager: EntityManager,
    ) { }

    async seed() {
        await this.seedProductsAndItems();
    }

    private async generateProductData(categories: Category[]): Promise<Partial<Product>> {
        const category: Category = categories[Math.floor(Math.random() * categories.length)];
        return {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: category,
        };
    }

    private async generateProductItemData(product: Product): Promise<Partial<ProductItem>> {
        return {
            SKU: faker.random.alphaNumeric(10),
            qty_in_stock: faker.datatype.number(100),
            product_image: faker.image.imageUrl(),
            price: faker.datatype.number({ min: 10, max: 1000, precision: 0.01 }),
            product: product,
        };
    }

    async seedProductsAndItems() {
        const countProducts: number = await this.productRepository.count();
        const countProductItems: number = await this.productItemRepository.count();
        const PRODUCT_COUNT: number = 50;
        const GENERATE_PRODUCT_COUNT = PRODUCT_COUNT - countProducts;
        const GENERATE_PRODUCT_ITEM_COUNT = PRODUCT_COUNT - countProductItems;

        const categories = await this.categoryRepository.find();

        // Seed products
        for (let i = 0; i < GENERATE_PRODUCT_COUNT; i++) {
            const productData = await this.generateProductData(categories);
            await this.entityManager.transaction(async (transactionalEntityManager) => {
                await transactionalEntityManager.upsert(Product, productData, { conflictPaths: ['name'] });
            });
        }

        // Seed product items
        const products = await this.productRepository.find();
        for (let i = 0; i < GENERATE_PRODUCT_ITEM_COUNT; i++) {
            const randomProduct: Product = products[Math.floor(Math.random() * products.length)];
            const productItemData = await this.generateProductItemData(randomProduct);
            await this.entityManager.transaction(async (transactionalEntityManager) => {
                await transactionalEntityManager.upsert(ProductItem, productItemData, { conflictPaths: ['SKU'] });
            });
        }
    }
}
