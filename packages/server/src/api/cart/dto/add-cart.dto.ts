import { IsNotEmpty, IsString } from 'class-validator';

export class AddToCartDto {
    @IsNotEmpty({ message: 'Qty is required' })
    qty: number;
}
