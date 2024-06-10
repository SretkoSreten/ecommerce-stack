import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { ShippingService } from "../services/shipping.service";
import { Roles } from "src/api/role/role.enum";
import { Auth } from "src/api/auth/guards/auth.decorator";


@Controller('shipping')
export class ShippingController {
    constructor(
        private readonly shippingService: ShippingService
    ){}

    @Get('')
    async getShippingMethods(){
        return this.shippingService.getShippingMethods()
    }

}