import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Country } from "src/database/entities/country/country.entity";
import { Repository } from "typeorm";


@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async getCountries(){
    return this.countryRepository.find();
  }
}