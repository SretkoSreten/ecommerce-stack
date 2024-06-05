import { Entity, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

@Entity()
export class LoginUserDto {

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}
