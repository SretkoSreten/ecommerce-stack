import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentType } from 'src/database/entities/payment/payment.entity';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class PaymentTypeSeeder {
  constructor(
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepository: Repository<PaymentType>,
    private readonly entityManager: EntityManager,
  ) {}

  private generatePaymentTypeData(): Partial<PaymentType>[] {
    return [
      { value: 'Credit Card' },
      { value: 'Debit Card' },
      { value: 'PayPal' },
      { value: 'Bank Transfer' },
      { value: 'Crypto' },
    ];
  }

  async seed() {
    const paymentTypes = this.generatePaymentTypeData();
    const count:number = await this.paymentTypeRepository.count();
    const PAYMENT_COUNT: number = paymentTypes.length;
    const GENERATE_COUNT = PAYMENT_COUNT - count;

    for (let i = 0; i < GENERATE_COUNT; i++){
      const data = paymentTypes[i];
      await this.entityManager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.upsert(PaymentType, data, {conflictPaths: ['value']});
      });
    }
  }
}
