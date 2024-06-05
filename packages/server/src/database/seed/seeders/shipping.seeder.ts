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

  private generateShippingMethodName(): string {
    // Generate a random shipping method name
    return faker.lorem.word();
  }

  private generateShippingMethodData(): Partial<ShippingMethod> {
    // Generate shipping method data
    return {
      name: this.generateShippingMethodName(),
      price: Math.random() * 500
    };
  }


  async seed(){
    const count: number = await this.shippingMethodRepository.count();
    const SHIPPING_COUNT: number = 50;
    const GENERATE_COUNT = SHIPPING_COUNT - count;
    await this.seedShippingMethods(GENERATE_COUNT);
  }

  async seedShippingMethods(numShippingMethods: number) {
    for (let i = 0; i < numShippingMethods; i++) {
      const shippingMethodData = this.generateShippingMethodData();

      await this.entityManager.transaction(async (transactionalEntityManager) => {
        // Create new ShippingMethod entity
        const newShippingMethod = transactionalEntityManager.create(ShippingMethod, shippingMethodData);
        await transactionalEntityManager.save(newShippingMethod);
      });
    }
  }
}
