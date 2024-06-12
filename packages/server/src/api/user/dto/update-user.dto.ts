import {
  IsEmail,
  IsString,
  MinLength,
  IsPhoneNumber,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
  IsNotEmpty,
} from "class-validator";

// Custom decorator to check if passwords match
function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "match",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}

export class UpdateUserAuthBody {
  @IsNotEmpty({ message: "Email should not be empty"})
  @IsEmail({}, { message: "Invalid email address" })
  email: string;

  @IsNotEmpty({ message: "Password should not be empty"})
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @IsNotEmpty({ message: "Confirm password should not be empty"})
  @Match("password", { message: "Passwords do not match" })
  confirmPassword: string;

  @IsNotEmpty({ message: "Phone should not be empty"})
  @IsNotEmpty({ message: "Phone cannot be empty" })
  phone: string;

  @IsNotEmpty({ message: "Full name should not be empty"})
  @IsString({ message: "Full name must be a string" })
  fullname: string;
}
