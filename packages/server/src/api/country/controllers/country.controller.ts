import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CountryService } from '../services/country.service';


@Controller('countries')
export class CountryController {
    constructor(private readonly countrySesrvice: CountryService) { }

    @Get('/')
    getCountries() {
        return this.countrySesrvice.getCountries(); 
    }
}
