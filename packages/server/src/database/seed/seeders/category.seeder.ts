import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Category } from 'src/database/entities/category/category.entity';

@Injectable()
export class CategorySeederSeeder {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly entityManager: EntityManager,
  ) {}

  private generateCategoryData(parentCategory?: Category): Partial<Category> {
    return {
      category_name: faker.commerce.department(),
      parent: parentCategory,
    };
  }

  async seed(){
    const count: number = await this.categoryRepository.count();
    const CATEGORY_COUNT: number = 5;
    const GENERATE_COUNT = CATEGORY_COUNT - count;
    await this.seedCategories(GENERATE_COUNT, 2);
  }

  async seedCategories(numCategories: number, numSubcategories: number) {
    const rootCategories: Category[] = [];

    for (let i = 0; i < numCategories; i++) {
      const categoryData = this.generateCategoryData();
      const rootCategory = await this.entityManager.transaction(async (transactionalEntityManager) => {
        return await transactionalEntityManager.save(Category, categoryData);
      });
      rootCategories.push(rootCategory);
    }

    for (const rootCategory of rootCategories) {
      for (let j = 0; j < numSubcategories; j++) {
        const subcategoryData = this.generateCategoryData(rootCategory);
        await this.entityManager.transaction(async (transactionalEntityManager) => {
          await transactionalEntityManager.upsert(Category, subcategoryData, {conflictPaths: ['category_name']});
        });
      }
    }
  }
}
