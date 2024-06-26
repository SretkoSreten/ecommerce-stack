import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OrderStatus } from '../../entities/order/order_status.entity';
import { StatusType } from '../../../constants/status.constants';

@Injectable()
export class OrderStatusSeeder {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
    private readonly entityManager: EntityManager,
  ) {}

  private generateOrderStatus(): string {
    // Generate a random order status
    const statusOptions = Object.values(StatusType)
    const rand = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    return rand;
  }

  private generateOrderStatusData(): Partial<OrderStatus> {
    // Generate order status data
    return {
      status: this.generateOrderStatus(),
    };
  }

  async seed(){
    const count: number = await this.orderStatusRepository.count();
    const ORDER_COUNT: number = Object.values(StatusType).length;
    const GENERATE_COUNT = ORDER_COUNT - count;
    await this.seedOrderStatuses(GENERATE_COUNT);
  }

  async seedOrderStatuses(numOrderStatuses: number) {
    for (let i = 0; i < numOrderStatuses; i++) {
      const orderStatusData = this.generateOrderStatusData();

      await this.entityManager.transaction(async (transactionalEntityManager) => {
        // Create new OrderStatus entity
        const newOrderStatus = transactionalEntityManager.create(OrderStatus, orderStatusData);
        await transactionalEntityManager.save(newOrderStatus);
      });
    }
  }
}
