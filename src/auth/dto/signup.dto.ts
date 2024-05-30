import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ 
    description: 'User username',
    minLength: 3,
    maxLength: 30,
    example: 'john_doe123'
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(30, { message: 'Username cannot be longer than 30 characters' })
  readonly username: string;

  @ApiProperty({ 
    description: 'User email address',
    example: 'user@example.com'
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string;

  @ApiProperty({ 
    description: 'User password',
    minLength: 6,
    maxLength: 30,
    example: 'password123'
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(30, { message: 'Password cannot be longer than 30 characters' })
  readonly password: string;
}
