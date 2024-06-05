import { IsNotEmpty, IsOptional, IsString, IsInt, IsPositive, IsNumberString, IsDate, IsBoolean, IsISO8601 } from 'class-validator';

export class UserPaymentDto {
  @IsNotEmpty({ message: 'Provider is required' })
  @IsString({ message: 'Provider must be a string' })
  provider: string;

  @IsNotEmpty({ message: 'Account number is required' })
  @IsInt({ message: 'Account number must be a number' })
  account_number: number;

  @IsISO8601()
  expiry_date: Date;

  @IsNotEmpty({ message: 'Payment type is required' })
  @IsString({ message: 'Payment type must be a string' })
  paymentType: string;
}