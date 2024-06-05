import { Entity, Column } from 'typeorm';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateAddressDto {

    @IsNotEmpty({ message: 'City 1 is required' })
    @IsString({ message: 'City must be a string' })
    city: string;

    @IsNotEmpty({ message: 'Country is required' })
    @IsString({ message: 'Country must be a string' })
    country: string;

    @IsNotEmpty({ message: 'Postal code is required' })
    @IsString({ message: 'Postal code must be a string' })
    @Matches(/^[A-Za-z0-9\- ]+$/, { message: 'Postal code contains invalid characters' })
    postal_code: string;

    @IsNotEmpty({ message: 'Address line 1 is required' })
    @IsString({ message: 'Address line 1 must be a string' })
    address_line1: string;


    @IsString({ message: 'Address line 2 must be a string' })
    address_line2: string;

    @IsNotEmpty({ message: 'Unit number is required' })
    @IsInt({ message: 'Unit number must be a number' })
    unit_number: number;

    @IsNotEmpty({ message: 'Region is required' })
    @IsString({ message: 'Region must be a string' })
    region: string;

    @IsNotEmpty({ message: 'Street number is required' })
    @IsInt({ message: 'Street number be a number' })
    street_number: number;
}
