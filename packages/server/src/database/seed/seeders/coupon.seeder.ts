import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Coupon } from '../../entities/coupon/coupon.entity';

@Injectable()
export class CouponSeeder {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    private readonly entityManager: EntityManager,
  ) {}

  private generateCouponCode(): string {
    // Generate a random coupon code
    return faker.random.alphaNumeric(8).toUpperCase();
  }

  async seed(){
    const count: number = await this.couponRepository.count();
    const COUPON_COUNT: number = 10;
    const GENERATE_COUNT = COUPON_COUNT - count;
    await this.seedCoupons(GENERATE_COUNT);
  }

  private getRandomType(values:any){
    return values[Math.floor(Math.random() * values.length)];
  }

  private generateCouponData(): Partial<Coupon> { 
    return {
      code: this.generateCouponCode(),
      discount: parseFloat(faker.finance.amount(5, 50, 2)), // Random discount amount between 5 and 50
      expire: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }),
      isActive: faker.datatype.boolean(), // Randomly set isActive to true or false
      description: faker.lorem.sentence(),
      discountType: this.getRandomType(['percentage', 'fixed_amount']),
      startDate: faker.date.recent(), // Random recent date for start
      usageLimit: faker.datatype.number({ min: 1, max: 100 }), // Random usage limit between 1 and 100
      usageCount: faker.datatype.number({ min: 0, max: 10 }), // Random usage count between 0 and 10
      minOrderValue: parseFloat(faker.finance.amount(10, 100, 2)), // Random min order value between 10 and 100
    }; 
  }
  async seedCoupons(numCoupons: number) {
    for (let i = 0; i < numCoupons; i++) {
      const couponData = this.generateCouponData();
      await this.entityManager.transaction(async (transactionalEntityManager) => {
        // Create new Coupon entity
        const newCoupon = transactionalEntityManager.create(Coupon, couponData);
        await transactionalEntityManager.save(newCoupon);
      });
    }
  }
}
