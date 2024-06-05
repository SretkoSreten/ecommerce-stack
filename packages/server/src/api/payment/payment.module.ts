import { Module } from "@nestjs/common";
import { PaymentController } from "./controllers/payment.controller";
import { PaymentService } from "./services/payment.service";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product/product.entity";
import { UserPaymentMethod } from "src/database/entities/payment/user-payment-method.entity";
import { PaymentType } from "src/database/entities/payment/payment.entity";


@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([
            Product,
            UserPaymentMethod,
            PaymentType
        ])
    ],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule {}