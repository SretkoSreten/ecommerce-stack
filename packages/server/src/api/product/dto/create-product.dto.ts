import { IsNotEmpty, IsOptional, IsString, IsInt, IsPositive, IsNumberString } from 'class-validator';

export class CreateVariationOptionsDto {
  variations: CreateVariationOptionDto[]
}

export class CreateVariationOptionDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Value is required' })
  @IsString({ message: 'Value must be a string' })
  value: string;
}
export class CreateProductDto extends CreateVariationOptionsDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Product image must be a string' })
  product_image?: string;

  @IsNotEmpty({ message: 'Category is required' })
  @IsString({ message: 'Category must be a string' }) // Assuming category is represented by a string identifier
  category: string;

  @IsNotEmpty({ message: 'SKU is required' })
  @IsString({ message: 'SKU must be a string' })
  SKU: string;

  @IsInt({ message: 'Quantity in stock must be an integer' })
  @IsPositive({ message: 'Quantity in stock must be a positive number' })
  qty_in_stock: number;

  @IsNotEmpty({ message: 'Price is required' })
  price: number; // Use string to ensure validation with @IsNumberString
}

