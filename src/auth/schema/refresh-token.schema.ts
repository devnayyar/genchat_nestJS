// refresh-token.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RefreshToken extends Document {
  @Prop()
  userId: string;

  @Prop()
  token: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
