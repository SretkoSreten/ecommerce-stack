import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewController } from "./controllers/review.controller";
import { ReviewService } from "./services/review.service";
import { UserReview } from "src/database/entities/review/review.entity";
import { User } from "src/database/entities/user/user.entity";
import { OrderLine } from "src/database/entities/order/order_line.entity";
import { Product } from "src/database/entities/product/product.entity";
import { ProductItem } from "src/database/entities/product/product_item.entity";

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([UserReview, User, OrderLine, ProductItem])],
    controllers: [ReviewController],
    providers: [ReviewService]
})
export class ReviewModule {}