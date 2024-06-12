import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { count } from "console";
import { successObject } from "src/common/helper/sucess-response.interceptor";
import { Address } from "src/database/entities/address/address.entity";
import { UserAddress } from "src/database/entities/address/user-address.entity";
import { Country } from "src/database/entities/country/country.entity";
import { User } from "src/database/entities/user/user.entity";
import { errorMessages } from "src/errors/custom";
import { EntityManager, Not, Repository, getRepository } from "typeorm";
import { CreateAddressDto } from "../dto/create-address.dto";

export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async createAddress(
    user: User,
    addressData: CreateAddressDto
  ): Promise<Address> {
    try {
      // Destructure and spread address data to avoid mutating the original input
      const { country, ...rest } = addressData;

      // Find country by name
      const countryFound = await this.countryRepository.findOne({
        where: { name: country },
      });

      if (!countryFound) {
        throw new NotFoundException(`Failed to find country named: ${country}`);
      }

      // Create new address data with the associated country entity
      const newAddressData = { ...rest, country: countryFound };

      // Create and save the new address
      const newAddress = this.addressRepository.create(newAddressData);
      await this.addressRepository.save(newAddress);

      // Create and save the user address association
      const userAddress = this.userAddressRepository.create({
        address: newAddress,
        user,
      });
      await this.userAddressRepository.save(userAddress);

      return newAddress;
    } catch (error) {
      throw new Error(`Failed to create address: ${error.message}`);
    }
  }

  async getUserAddresses(user: User) {
    console.log(user);
    const addresses = await this.userAddressRepository.find({
      where: { user },
      relations: ["address"],
    });
    return addresses;
  }

  async selectAddress(user: User, id: number): Promise<any> {
    try {
      // Find the selected address
      const userAddressFound = await this.userAddressRepository.findOne({
        where: { id, user },
      });

      if (!userAddressFound) {
        throw new Error(`Address with ID ${id} not found for the user`);
      }

      // Ensure the selected address is not already the default
      if (userAddressFound.is_default) {
        return successObject;
      }

      // Start a transaction to ensure atomicity
      await this.userAddressRepository.manager.transaction(
        async (transactionalEntityManager) => {
          // Update all other addresses of the user to not be the default
          await transactionalEntityManager.update(
            UserAddress,
            { user, id: Not(id) },
            { is_default: false }
          );

          // Update the selected address to be the default
          await transactionalEntityManager.update(
            UserAddress,
            { id },
            { is_default: true }
          );
        }
      );

      return successObject;
    } catch (error) {
      console.error("Error selecting address:", error);
      throw new Error("Unable to select address");
    }
  }

  async createUserAddress(user: User, address: Address) {
    const userAddress: UserAddress = this.userAddressRepository.create();
    userAddress.address = address;
    userAddress.user = user;
    userAddress.is_default = true;
    return this.userAddressRepository.save(userAddress);
  }
  async getAddressById(addressId: number): Promise<Address> {
    try {
      const address = await this.addressRepository.findOne({
        where: { id: addressId },
        relations: ["country"],
      });

      if (!address) {
        throw new NotFoundException(`Address with ID ${addressId} not found`);
      }

      return address;
    } catch (error) {
      throw new NotFoundException(`Failed to get address: ${error.message}`);
    }
  }

  async updateAddress(
    addressId: number,
    addressData: CreateAddressDto
  ): Promise<any> {
    const address = await this.addressRepository.findOne({
      where: { id: addressId },
    });
    if (!address) {
      throw new UnauthorizedException(errorMessages.address.notFound);
    }

    const countryName = addressData.country;
    const country: Country = await this.countryRepository.findOneBy({
      name: countryName,
    });
    delete addressData.country;
    const data = { ...addressData, country };

    try {
      await this.addressRepository.update(addressId, data);
      const updatedAddress = await this.addressRepository.findOneBy({
        id: addressId,
      });
      return updatedAddress;
    } catch (error) {
      throw new Error(`Failed to update address: ${error.message}`);
    }
  }

  async deleteAddress(addressId: number): Promise<any> {
    await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(Address)
      .where("id = :addressId", { addressId })
      .execute();

    return successObject;
  }
}
