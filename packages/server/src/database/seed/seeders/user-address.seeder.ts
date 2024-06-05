import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/database/entities/address/address.entity';
import { UserAddress } from 'src/database/entities/address/user-address.entity';
import { User } from 'src/database/entities/user/user.entity';
import { Repository, EntityManager } from 'typeorm';


@Injectable()
export class UserAddressSeeder {
  constructor(
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly entityManager: EntityManager,
  ) {}

  private async generateUserAddressData(users: User[], addresses: Address[]): Promise<Partial<UserAddress>> {
    const user = users[Math.floor(Math.random() * users.length)];
    const address = addresses[Math.floor(Math.random() * addresses.length)];
    return {
      is_default: Math.random() < 0.5, // Randomly set as default
      user: user,
      address: address,
    };
  }

  async seedUserAddresses(numUserAddresses: number) {
    const users = await this.userRepository.find(); // Fetch existing users from DB
    const addresses = await this.addressRepository.find(); // Fetch existing addresses from DB

    for (let i = 0; i < numUserAddresses; i++) {
      const data = await this.generateUserAddressData(users, addresses);
      await this.entityManager.save(UserAddress, data);
    }
  }
}
