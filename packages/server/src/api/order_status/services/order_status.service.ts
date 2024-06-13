import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderStatus } from "src/database/entities/order/order_status.entity";
import { Repository } from "typeorm";


@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
  ) {}

  async getAllStatus(){
    return this.orderStatusRepository.find();
  }
}