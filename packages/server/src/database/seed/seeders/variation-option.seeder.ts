import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { VariationOption } from '../../entities/variation/variation_option.entity';
import { Variation } from '../../entities/variation/variation.entity';

@Injectable()
export class VariationOptionSeeder {
  constructor(
    @InjectRepository(VariationOption)
    private readonly variationOptionRepository: Repository<VariationOption>,
    @InjectRepository(Variation)
    private readonly variationRepository: Repository<Variation>,
    private readonly entityManager: EntityManager,
  ) {}

  private generateRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  private async generateVariationOptionData(variations: Variation[]): Promise<Partial<VariationOption>> {
    const variation = this.generateRandomElement(variations);

    return {
      value: faker.commerce.productAdjective(),
      variation: variation,
    };
  }

  async seed(){
    const count: number = await this.variationOptionRepository.count();
    const VARIATION_COUNT: number = 50;
    const GENERATE_COUNT = VARIATION_COUNT - count;
    await this.seedVariationOptions(GENERATE_COUNT);
  }

  async seedVariationOptions(numOptions: number) {
    const variations = await this.variationRepository.find();

    for (let i = 0; i < numOptions; i++) {
      const variationOptionData = await this.generateVariationOptionData(variations);
      await this.entityManager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.upsert(VariationOption, variationOptionData, { conflictPaths: ['value'] });
      });
    }
  }
}
