import { IsNotEmpty } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public id: number;
}

export class VerifyPayloadDto {
  @IsNotEmpty()
  token: string;
}