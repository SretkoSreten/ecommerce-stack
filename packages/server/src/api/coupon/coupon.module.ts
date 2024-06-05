import { Module } from "@nestjs/common";
import { CouponController } from "./controllers/coupon.controller";
import { CouponService } from "./services/coupon.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coupon } from "src/database/entities/coupon/coupon.entity";
import { UserModule } from "../user/user.module";

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Coupon])],
    controllers: [CouponController],
    providers: [CouponService]
})
export class CouponModule {}