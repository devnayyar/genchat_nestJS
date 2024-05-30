import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ 
    description: 'User email address',
    example: 'user@example.com'
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string;

  @ApiProperty({ 
    description: 'User password',
    minLength: 6,
    example: 'password123'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;
}
