import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Variation } from 'src/database/entities/variation/variation.entity';
import { Category } from 'src/database/entities/category/category.entity';

@Injectable()
export class VariationSeeder {
  constructor(
    @InjectRepository(Variation)
    private readonly variationRepository: Repository<Variation>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly entityManager: EntityManager,
  ) {}

  private generateRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  private async generateVariationData(categories: Category[]): Promise<Partial<Variation>> {
    const category = this.generateRandomElement(categories);

    return {
      name: faker.commerce.productAdjective(),
      category: category,
    };
  }

  async seed(){
    const count: number = await this.variationRepository.count();
    const VARIATION_COUNT: number = 10;
    const GENERATE_COUNT = VARIATION_COUNT - count;
    await this.seedVariations(GENERATE_COUNT)
  }

  async seedVariations(numVariations: number) {
    const categories = await this.categoryRepository.find();

    for (let i = 0; i < numVariations; i++) {
      const variationData = await this.generateVariationData(categories);
      await this.entityManager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.upsert(Variation, variationData, { conflictPaths: ['name'] });
      });
    }
  }
}
