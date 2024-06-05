import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVariationDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'Category is required' })
    @IsString({ message: 'Category must be a string' })
    category: string;
}

