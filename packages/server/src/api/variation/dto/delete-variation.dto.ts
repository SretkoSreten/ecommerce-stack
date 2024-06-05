import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteVariationDto {
    @IsNotEmpty({ message: 'ID is required, it must be provided' })
    id: number;
}