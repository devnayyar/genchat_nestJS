import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RefreshToken extends Document {
  @Prop({ 
    description: 'The ID of the user associated with this refresh token',
    required: true 
  })
  userId: string;

  @Prop({ 
    description: 'The refresh token string',
    required: true 
  })
  token: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
