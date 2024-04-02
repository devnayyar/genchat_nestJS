import { Controller, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GenchatService } from './genchat.service';
import { ChatInputDto } from './dto/genchat.dto';

@Controller('genchat')
export class GenchatController {
  constructor(private readonly genchatService: GenchatService) {}

  @Post('chat')
  async chat(@Body() chatInputDto: ChatInputDto): Promise<string> {
    return await this.genchatService.chat(chatInputDto).toPromise();
  }

  @Post('chat/streaming')
  chatStreaming(@Body() chatInputDto: ChatInputDto): Observable<string> {
    return this.genchatService.chat(chatInputDto);
  }
}
