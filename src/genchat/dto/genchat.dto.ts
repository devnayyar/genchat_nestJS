import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatInputDto {
  @ApiProperty({ 
    description: 'The text message to be sent in the chat',
    example: 'Hello, how are you?'
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}
