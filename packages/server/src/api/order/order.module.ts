import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopOrder } from "src/database/entities/order/order.entity";
import { OrderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";
import { Coupon } from "src/database/entities/coupon/coupon.entity";
import { AddressModule } from "../address/address.module";
import { Address } from "src/database/entities/address/address.entity";
import { ShippingMethod } from "src/database/entities/ship_method/ship_method.entity";
import { UserPaymentMethod } from "src/database/entities/payment/user-payment-method.entity";
import { OrderStatus } from "src/database/entities/order/order_status.entity";

@Module({
    imports: [
        UserModule,
        AddressModule,
        TypeOrmModule.forFeature([
            ShopOrder, 
            Coupon, 
            Address, 
            ShippingMethod, 
            UserPaymentMethod, 
            OrderStatus
        ])
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule { }