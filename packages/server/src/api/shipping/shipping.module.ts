import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user/user.entity";
import { ShippingController } from "./controllers/shipping.controller";
import { ShippingService } from "./services/shipping.service";
import { ShippingMethod } from "src/database/entities/ship_method/ship_method.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, ShippingMethod])],
    controllers: [ShippingController],
    providers: [ShippingService]
})
export class ShippingModule {}