import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ShippingMethod } from 'src/database/entities/ship_method/ship_method.entity';

@Injectable()
export class ShippingMethodSeeder {
  constructor(
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodRepository: Repository<ShippingMethod>,
    private readonly entityManager: EntityManager,
  ) {}

  private generateShippingData(): Partial<ShippingMethod>[] {
    return [
      { name: 'Fedex', price: 23 },
      { name: 'Amazon Express', price: 10 },
      { name: 'Ali Express', price: 10 },
      { name: 'Alibaba', price: 0 },
    ];
  }

  async seed(){
    const count: number = await this.shippingMethodRepository.count();
    const SHIPPING_COUNT: number = this.generateShippingData().length;
    const GENERATE_COUNT = SHIPPING_COUNT - count;
    await this.seedShippingMethods(GENERATE_COUNT);
  }

  async seedShippingMethods(numShippingMethods: number) {
    const methods = this.generateShippingData();
    for (let i = 0; i < numShippingMethods; i++) {
      await this.entityManager.transaction(async (transactionalEntityManager) => {
        // Create new ShippingMethod entity
        const newShippingMethod = transactionalEntityManager.create(ShippingMethod, methods[i]);
        await transactionalEntityManager.save(newShippingMethod);
      });
    }
  }
}
