import { Module } from "@nestjs/common";
import { CartController } from "./controllers/cart.controller";
import { CartService } from "./services/cart.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShoppingCart } from "src/database/entities/cart/cart.entity";
import { UserModule } from "../user/user.module";
import { ShoppingCartItem } from "src/database/entities/cart/cart_item.entity";
import { User } from "src/database/entities/user/user.entity";
import { Product } from "src/database/entities/product/product.entity";
import { ProductItem } from "src/database/entities/product/product_item.entity";
import { Coupon } from "src/database/entities/coupon/coupon.entity";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([
            ShoppingCart,
            ShoppingCartItem,
            User,
            Product,
            ProductItem,
            Coupon
        ])
    ],
    controllers: [CartController],
    providers: [CartService]
})
export class CartModule { }