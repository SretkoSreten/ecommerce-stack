import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @IsNotEmpty({ message: 'ID is required' })
    id: number;           // The ID of the category to update
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name?: string;        // Optional new name
    @IsNotEmpty({ message: 'Parend ID is required' })
    parentId?: number;    // Optional new parent category ID
}