import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVariationOptionDto {
    @IsNotEmpty({ message: 'ID is required, ID must be provided' })
    variationId: number;

    @IsNotEmpty({ message: 'Value is required' })
    @IsString({ message: 'Value must be a string' })
    value: string;
}


export class CreateVariationOptionsDto {
    options: CreateVariationOptionDto[];
}