import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Coupon } from 'src/database/entities/coupon/coupon.entity';

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

  private generateCouponData(): Partial<Coupon> {
    // Generate coupon data
    return {
      code: this.generateCouponCode(),
      discount: parseFloat(faker.finance.amount(5, 50, 2)), // Random discount amount between 5 and 50
      expire: faker.date.future(), // Random future date for expiry
      isActive: false, // Randomly set isActive to true or false
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
