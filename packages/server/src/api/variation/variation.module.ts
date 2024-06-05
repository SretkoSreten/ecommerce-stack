import { Module } from "@nestjs/common";
import { VariationController } from "./controllers/variation.controller";
import { VariationService } from "./services/variation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Variation } from "src/database/entities/variation/variation.entity";
import { Category } from "src/database/entities/category/category.entity";
import { UserService } from "../user/services/user.service";
import { User } from "src/database/entities/user/user.entity";
import { VariationOption } from "src/database/entities/variation/variation_option.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Variation, Category, User, VariationOption])],
    controllers: [VariationController],
    providers: [VariationService, UserService]
})
export class VariationModule {}