import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

import { faker } from '@faker-js/faker';
import { Address } from 'src/database/entities/address/address.entity';
import { Country } from 'src/database/entities/country/country.entity';
import { User } from 'src/database/entities/user/user.entity';
import { UserAddress } from 'src/database/entities/address/user-address.entity';

@Injectable()
export class AddressSeeder {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly entityManager: EntityManager,
    ) { }

    private generateAddressData(countries: Country[]): Partial<Address> {
        const country = countries[Math.floor(Math.random() * countries.length)];
        return {
            unit_number: faker.location.secondaryAddress(),
            street_number: faker.location.streetAddress(),
            address_line1: faker.location.streetAddress(),
            address_line2: faker.location.streetAddress(),
            city: faker.location.city(),
            region: faker.location.state(),
            postal_code: faker.location.zipCode(),
            country,
        };
    }

    async seed() {
        const count: number = await this.addressRepository.count();
        const ADDRESS_COUNT: number = 10;
        const GENERATE_COUNT = ADDRESS_COUNT - count;
        await this.seedAddresses(GENERATE_COUNT);
    }

    async seedAddresses(numAddresses: number) {
        const countries = await this.countryRepository.find();
        for (let i = 0; i < numAddresses; i++) {
            await this.seedAddress(countries);
        }
    }

    private async seedAddress(countries: Country[]) {
        const data: Partial<Address> = this.generateAddressData(countries);
        await this.entityManager.transaction(async (transactionalEntityManager) => {
            const address = await transactionalEntityManager.save(Address, data);

            // Assign a user to the address
            const users = await this.userRepository.find();
            const user = users[Math.floor(Math.random() * users.length)];
            const userAddress = new UserAddress();
            userAddress.is_default = Math.random() < 0.5;
            userAddress.user = user;
            userAddress.address = address;
            await transactionalEntityManager.save(UserAddress, userAddress);
        });
    }
}
