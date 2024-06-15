import {
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from "class-validator";

function IsExpiryDateValid(validationOptions?: { message?: string }) {
  return Validate((value: string) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!regex.test(value)) {
      return false;
    }

    const [month, year] = value.split("/");
    const fullYear = Number(year) + (Number(year) < 30 ? 2000 : 1900);
    const expiry = new Date(fullYear, Number(month) - 1);

    return expiry > new Date();
  }, validationOptions);
}

export class UserPaymentDto {
  @IsNotEmpty({ message: "Account name is required" })
  @IsString({ message: "Account name must be a string" })
  account_name: string;

  @IsNotEmpty({ message: "Account number is required" })
  @IsString({ message: "Account number must be a string" })
  @Matches(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/, {
    message: 'Card number must be in format xxxx-xxxx-xxxx-xxxx',
  })
  card_number: string;

  @IsNotEmpty({ message: "Expire date is required" })
  @IsString({ message: "Expire date is required" })
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in MM/YY format",
  })
  @IsExpiryDateValid({ message: "Expiry date must be in the future" })
  expiry_date: string;

  paymentType: string;
}
