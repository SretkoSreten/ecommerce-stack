import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserPaymentMethod } from 'src/database/entities/payment/user-payment-method.entity';
import { User } from 'src/database/entities/user/user.entity';
import { PaymentType } from 'src/database/entities/payment/payment.entity';

@Injectable()
export class UserPaymentMethodSeeder {
  constructor(
    @InjectRepository(UserPaymentMethod)
    private readonly userPaymentMethodRepository: Repository<UserPaymentMethod>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepository: Repository<PaymentType>,
    private readonly entityManager: EntityManager,
  ) {}

  private async generateUserPaymentMethodData(users: User[], paymentTypes: PaymentType[]): Promise<Partial<UserPaymentMethod>> {
    const user = users[Math.floor(Math.random() * users.length)];
    const paymentType = paymentTypes[Math.floor(Math.random() * paymentTypes.length)];

    return {
      provider: faker.company.name(),
      account_number: 23,
      expiry_date: faker.date.future(),
      is_default: Math.random() < 0.5,
      user: user,
      paymentType: paymentType,
    };
  }

  async seed() {
    const count: number = await this.userPaymentMethodRepository.count();
    const PAYMENT_COUNT: number = 10;
    const GENERATE_COUNT = PAYMENT_COUNT - count;

    const users = await this.userRepository.find();
    const paymentTypes = await this.paymentTypeRepository.find();

    for (let i = 0; i < GENERATE_COUNT; i++) {
      await this.seedUserPaymentMethod(users, paymentTypes);
    }
  }

  private async seedUserPaymentMethod(users: User[], paymentTypes: PaymentType[]) {
    const data: Partial<UserPaymentMethod> = await this.generateUserPaymentMethodData(users, paymentTypes);
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(UserPaymentMethod, data);
    });
  }
}
