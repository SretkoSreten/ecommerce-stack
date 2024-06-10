import { InjectRepository } from "@nestjs/typeorm";
import { count } from "console";
import { Address } from "src/database/entities/address/address.entity";
import { UserAddress } from "src/database/entities/address/user-address.entity";
import { Country } from "src/database/entities/country/country.entity";
import { User } from "src/database/entities/user/user.entity";
import { Repository, getRepository } from "typeorm";

export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}

  async createAddress(addressData: Partial<any>): Promise<Address> {
    try {
      // Extract address data and set address line properties
      const { address, country: countryName, ...restData } = addressData;
      const newData: Partial<Address> = {
        address_line1: address,
        address_line2: address,
        ...restData,
      };

      // Find country by name
      const country = await this.countryRepository.findOne({
        where: { name: countryName },
      });

      if (!country) {
        throw new Error(`Failed to find country named: ${countryName}`);
      }

      // Set country association
      newData.countries = country;

      // Create and save the new address
      const newAddress = this.addressRepository.create(newData);
      const savedAddress = await this.addressRepository.save(newAddress);

      return savedAddress;
    } catch (error) {
      throw new Error(`Failed to create address: ${error.message}`);
    }
  }

  async getUserAddresses(user: User) {
    const addresses = await this.userAddressRepository.find({
      where: { user },
      relations: ["address"],
    });
    return addresses;
  }

  async selectAddress(user: User, id: number): Promise<UserAddress | null> {
    try {
      // Reset all addresses for the user to not be default
      const userAddresses = await this.userAddressRepository.find({
        where: { user },
      });
      if (userAddresses.length > 0) {
        await Promise.all(
          userAddresses.map((address) =>
            this.userAddressRepository.update(
              { id: address.id },
              { is_default: false }
            )
          )
        );
      }

      const address: UserAddress = await this.userAddressRepository.findOneBy({
        id,
      });
      // Set the specified address as default
      await this.userAddressRepository.update(
        { id },
        { is_default: !address.is_default }
      );

      // Return the updated address
      const updatedAddress = await this.userAddressRepository.findOne({
        where: { id },
      });

      // If the address could not be found, throw an error
      if (!updatedAddress) {
        throw new Error("Address not found");
      }

      return updatedAddress;
    } catch (error) {
      // Log the error and rethrow it to be handled by the caller
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

  async getAddressById(addressId: number): Promise<Address | undefined> {
    const addressRepository = getRepository(Address);

    try {
      const address = await addressRepository.findOneBy({ id: addressId });
      return address;
    } catch (error) {
      throw new Error(`Failed to get address: ${error.message}`);
    }
  }

  async updateAddress(
    addressId: number,
    addressData: Partial<Address>
  ): Promise<Address | undefined> {
    const addressRepository = getRepository(Address);

    try {
      await addressRepository.update(addressId, addressData);
      const updatedAddress = await addressRepository.findOneBy({
        id: addressId,
      });
      return updatedAddress;
    } catch (error) {
      throw new Error(`Failed to update address: ${error.message}`);
    }
  }

  async deleteAddress(addressId: number): Promise<void> {
    const addressRepository = getRepository(Address);

    try {
      await addressRepository.delete(addressId);
    } catch (error) {
      throw new Error(`Failed to delete address: ${error.message}`);
    }
  }
}
