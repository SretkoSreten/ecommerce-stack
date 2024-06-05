import { Module } from "@nestjs/common";
import { AddressService } from "./services/address.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAddress } from "src/database/entities/address/user-address.entity";
import { Address } from "src/database/entities/address/address.entity";
import { Country } from "src/database/entities/country/country.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Address, UserAddress, Country])],
    providers: [AddressService],
    exports: [AddressService]
})
export class AddressModule { }