import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user/user.entity";
import { ShoppingCart } from "src/database/entities/cart/cart.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}