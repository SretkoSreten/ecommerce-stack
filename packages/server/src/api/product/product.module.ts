import { Module } from "@nestjs/common";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./services/product.service";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Variation } from "src/database/entities/variation/variation.entity";
import { VariationOption } from "src/database/entities/variation/variation_option.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Variation, VariationOption]), UserModule],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}