import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "../user/services/user.service";
import { User } from "src/database/entities/user/user.entity";
import { RoleModule } from "../role/role.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { AddressService } from "../address/services/address.service";
import { AddressModule } from "../address/address.module";
import { Address } from "src/database/entities/address/address.entity";
import { UserAddress } from "src/database/entities/address/user-address.entity";
import { Country } from "src/database/entities/country/country.entity";
import { ShoppingCart } from "src/database/entities/cart/cart.entity";
import { CartService } from "../cart/services/cart.service";
import { ShoppingCartItem } from "src/database/entities/cart/cart_item.entity";
import { ProductItem } from "src/database/entities/product/product_item.entity";
import { Coupon } from "src/database/entities/coupon/coupon.entity";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      User,
      Address,
      UserAddress,
      Country,
      ShoppingCart,
      ShoppingCartItem,
      ProductItem,
      Coupon
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "3h" },
    }),
    RoleModule,
    AddressModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AddressService, CartService],
  exports: [],
})
export class AuthModule {}
