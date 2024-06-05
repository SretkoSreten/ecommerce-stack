import { IsBoolean, IsISO8601, IsNotEmpty, IsString, isDateString } from 'class-validator';

export class UpdateCouponDto {
    @IsNotEmpty({ message: 'Code is required' })
    @IsString({ message: 'Code must be a string' })
    code: string;

    @IsNotEmpty({ message: 'Discount is required' })
    discount: number;

    @IsNotEmpty({ message: 'Expire date is required' })
    @IsISO8601()
    expire: Date;

    @IsNotEmpty({ message: 'Active is required' })
    isActive: boolean;
}