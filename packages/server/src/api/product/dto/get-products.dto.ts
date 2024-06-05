import { IsNotEmpty, IsOptional, IsString, IsInt, IsPositive, IsNumberString } from 'class-validator';


export class OptionDto {
  @IsString({ message: 'Name must be a string' }) // Assuming category is represented by a string identifier
  name: string;

  values: string[]
}

export class GetProductsDto {

  @IsNotEmpty({ message: 'Category is required' })
  @IsString({ message: 'Category must be a string' }) // Assuming category is represented by a string identifier
  category: string;

  @IsNotEmpty({ message: 'Min price is required' })
  minPrice?: number; // Use string to ensure validation with @IsNumberString

  @IsNotEmpty({ message: 'Max price is required' })
  maxPrice?: number; // Use string to ensure validation with @IsNumberString
  
  options: string

  @IsNotEmpty({ message: 'Page is required' })
  page?: number; // Use string to ensure validation with @IsNumberString

  @IsNotEmpty({ message: 'Page size is required' })
  pageSize?: number; // Use string to ensure validation with @IsNumberString

  @IsNotEmpty({ message: 'Sort is required' })
  sort?: string;
}


// options=[{name: 'Color', variations: ['Red']}]