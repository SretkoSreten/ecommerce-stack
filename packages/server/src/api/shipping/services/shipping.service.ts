import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShippingMethod } from "src/database/entities/ship_method/ship_method.entity";
import { Repository } from "typeorm";


@Injectable()
export class ShippingService {
    constructor(
        @InjectRepository(ShippingMethod)
        private readonly shippingRepository: Repository<ShippingMethod>
    ) {}

    async getShippingMethods(): Promise<ShippingMethod[]> {
        return this.shippingRepository.find();
    }
}