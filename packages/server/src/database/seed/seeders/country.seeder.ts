


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../entities/country/country.entity';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class CountrySeeder {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        private readonly entityManager: EntityManager,
    ) { }

    private generateCountryData(): Partial<Country>[] {
        // Replace this list with your actual country data
        const countries = [
            { name: 'United States' },
            { name: 'Canada' },
            { name: 'United Kingdom' },
            { name: 'Australia' },
            { name: 'Germany' },
        ];
        return countries;
    }

    async seed() {
        const countries = this.generateCountryData();
        const count:number = await this.countryRepository.count();
        const PAYMENT_COUNT: number = countries.length;
        const GENERATE_COUNT = PAYMENT_COUNT - count;

        await this.entityManager.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < GENERATE_COUNT; i++){
                const country:Partial<Country> = countries[i];
                await transactionalEntityManager.upsert(Country, country, { conflictPaths: ['name'] });
            }
        });
    }
}
