import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({
    description: 'The username of the user',
    required: true,
    uniqueItems: true,
    example: 'john_doe123'
  })
  @Prop({ unique: [true, 'Duplicate username entered'], required: [true, 'Username is required'] })
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    required: true,
    uniqueItems: true,
    example: 'user@example.com'
  })
  @Prop({ unique: [true, 'Duplicate email entered'], required: [true, 'Email is required'] })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    required: true,
    example: 'password123'
  })
  @Prop({ required: [true, 'Password is required'] })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
