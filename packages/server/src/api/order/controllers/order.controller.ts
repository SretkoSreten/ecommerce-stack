import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { Auth } from "src/api/auth/guards/auth.decorator";
import { Roles } from "src/api/role/role.enum";
import { OrderService } from "../services/order.service";
import { CurrentUser } from "src/api/auth/guards/user.decorator";
import { User } from "src/database/entities/user/user.entity";
import { CreateOrderDto } from "../dto/create-order.dto";

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ){}

    @Auth(Roles.USER, Roles.ADMIN)
    @Get('/user')
    async getUserOrder(
        @CurrentUser() user: User,
        @Query() query: any
    ){
        return this.orderService.getUserOrder(user, query);
    }
    
    @Auth(Roles.USER, Roles.ADMIN)
    @Get('/:id')
    async getOrder(
        @Param() params: any
    ){
        return this.orderService.getOrder(params.id)
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Get('cancel/:id')
    async cancelOrder(
        @CurrentUser() user: User,
        @Param() params: any
    ){
        return this.orderService.cancelOrder(user, params.id);
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Get('order/:id')
    async orderAgain(
        @CurrentUser() user: User,
        @Param() params: any
    ){
        return this.orderService.orderAgain(user, params.id);
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Put('coupon-apply/:id')
    async applyCoupon(
        @Param() params: any,
        @Body() {code}: any
    ){
        return this.orderService.applyCoupon(params.id, code);
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Post('create')
    async createOrder(
        @CurrentUser() user: User,
        @Body() body: CreateOrderDto
    ){
        return this.orderService.createOrder(user, body);
    }
}

