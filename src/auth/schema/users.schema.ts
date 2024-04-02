import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: [true, 'Duplicate email entered'],required: [true, 'Name is required'] }) // Change "name" to "username"
  username: string; // Change "name" to "username"

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ required: [true, 'Password is required'] })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
