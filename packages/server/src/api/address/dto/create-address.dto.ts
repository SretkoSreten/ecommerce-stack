import { IsNotEmpty, IsString, Matches, IsInt } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: "City is required" })
  @IsString({ message: "City must be a string" })
  city: string;

  @IsNotEmpty({ message: "Country is required" })
  @IsString({ message: "Country must be a string" }) // Added string validation for country
  country: string;

  @IsNotEmpty({ message: "Postal code is required" })
  @IsString({ message: "Postal code must be a string" })
  @Matches(/^[A-Za-z0-9\- ]+$/, {
    message: "Postal code contains invalid characters",
  })
  postal_code: string;

  @IsNotEmpty({ message: "Address line 1 is required" })
  @IsString({ message: "Address line 1 must be a string" }) // Added string validation for address_line1
  address_line1: string;

  @IsString({ message: "Address line 2 must be a string" })
  address_line2: string;

  @IsNotEmpty({ message: "Unit number is required" })
  @IsString({ message: "Unit number must be a string" }) // Added string validation for unit_number
  unit_number: string;

  @IsNotEmpty({ message: "Region is required" })
  @IsString({ message: "Region must be a string" }) // Added string validation for region
  region: string;

  @IsNotEmpty({ message: "Street number is required" })
  street_number: string; // Changed type to number to reflect integer requirement
}