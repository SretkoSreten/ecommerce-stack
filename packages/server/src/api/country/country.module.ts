import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "src/database/entities/country/country.entity";
import { CountryService } from "./services/country.service";
import { CountryController } from "./controllers/country.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Country])],
    controllers: [CountryController],
    providers: [CountryService]
})
export class CountryModule {}