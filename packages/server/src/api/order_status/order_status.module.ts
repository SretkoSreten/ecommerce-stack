import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderStatus } from "src/database/entities/order/order_status.entity";
import { StatusController } from "./controllers/order_status.controller";
import { StatusService } from "./services/order_status.service";


@Module({
    imports: [TypeOrmModule.forFeature([OrderStatus])],
    controllers: [StatusController],
    providers: [StatusService]
})
export class OrderStatusMOdule {}