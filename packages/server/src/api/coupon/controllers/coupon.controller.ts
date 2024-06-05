import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Auth } from "src/api/auth/guards/auth.decorator";
import { Roles } from "src/api/role/role.enum";
import { CouponService } from "../services/coupon.service";
import { CreateCouponDto } from "../dto/create-coupon.dto";
import { UpdateCouponDto } from "../dto/update-coupon.dto";

@Controller('coupons')
export class CouponController {
    constructor(
        private readonly couponService: CouponService
    ){}

    @Auth(Roles.USER, Roles.ADMIN)
    @Get(':id')
    async getCoupon(
        @Param() params: any
    ){
        return this.couponService.getCoupon(params.id)
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Post('create')
    async createCoupon(
        @Body() body: CreateCouponDto
    ){
        return this.couponService.createCoupon(body)
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Patch('update/:id')
    async updateCoupon(
        @Param() params: any,
        @Body() body: UpdateCouponDto
    ){
        return this.couponService.updateCoupon(params.id, body)
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Delete(':id')
    async deleteCoupon(
        @Param() params: any
    ){
        return this.couponService.createCoupon(params.id);
    }
}