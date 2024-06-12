import {IsNotEmpty} from 'class-validator';


export class CreateOrderDto {
    @IsNotEmpty({ message: 'You must choose payment method' })
    paymentMethodId: number;

    @IsNotEmpty({ message: 'You must choose payment method' })
    shipMethodId: number;

    @IsNotEmpty({ message: 'You must choose payment method' })
    addressId: number;

}
