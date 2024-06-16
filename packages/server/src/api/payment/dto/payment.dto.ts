import {
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from "class-validator";

function IsExpiryDateValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isExpiryDateValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [validationOptions?.message],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

          if (!regex.test(value)) {
            return false;
          }

          const [month, year] = value.split("/");
          const fullYear = Number(year) + (Number(year) < 30 ? 2000 : 1900);
          // Set the expiry date to the last day of the given month
          const expiry = new Date(fullYear, Number(month), 0); // Date set to 0 will give the last day of the previous month

          // Compare expiry date with the current date
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0); // Zero out the time part

          return expiry >= currentDate;
        },
        defaultMessage(args: ValidationArguments) {
          const customMessage = args.constraints[0];
          return customMessage || 'Expiry date must be in the future';
        }
      }
    });
  };
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
