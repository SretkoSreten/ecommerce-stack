import { Module } from "@nestjs/common";
import { AddressService } from "./services/address.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAddress } from "src/database/entities/address/user-address.entity";
import { Address } from "src/database/entities/address/address.entity";
import { Country } from "src/database/entities/country/country.entity";
import { AddressController } from "./controllers/address.controller";
import { User } from "src/database/entities/user/user.entity";
import { UserModule } from "../user/user.module";

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([User, Address, UserAddress, Country])],
    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService]
})
export class AddressModule { }