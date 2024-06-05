import { Type } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, Length, Matches, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/api/address/dto/create-address.dto';
import { User } from 'src/database/entities/user/user.entity';

export class ShippingMethodDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name be a string' })
    name: string;
}

export class CreateOrderDto {
    @IsNotEmpty({ message: 'You must choose payment method' })
    paymentMethodId: number;

    @IsNotEmpty({ message: 'Status is required' })
    @IsString({ message: 'Status be a string' })
    status: string;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => ShippingMethodDto)
    shipping_method: ShippingMethodDto;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    shipping_address: CreateAddressDto;

    user: User;

}
