import { IsNotEmpty, IsString } from 'class-validator';

export class ChatInputDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
