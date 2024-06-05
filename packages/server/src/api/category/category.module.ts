import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/database/entities/category/category.entity";
import { CategoryService } from "./services/category.service";
import { CategoryController } from "./controllers/category.controller";
import { UserModule } from "../user/user.module";


@Module({
    imports: [TypeOrmModule.forFeature([Category]), UserModule],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {}