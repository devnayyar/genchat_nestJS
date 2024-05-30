import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { GenchatService } from './genchat.service';
import { ChatInputDto } from './dto/genchat.dto';

@ApiTags('Genchat') // Add a tag to group related endpoints in Swagger UI
@Controller('genchat')
export class GenchatController {
  constructor(private readonly genchatService: GenchatService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Send a chat message' }) // Define Swagger operation summary
  @ApiResponse({ status: 200, description: 'Message sent successfully' }) // Define Swagger response
  @ApiBody({ type: ChatInputDto }) // Define Swagger request body
  async chat(@Body() chatInputDto: ChatInputDto): Promise<string> {
    return await this.genchatService.chat(chatInputDto).toPromise();
  }

  // @Post('chat/streaming')
  // @ApiOperation({ summary: 'Send a chat message with streaming' }) // Define Swagger operation summary
  // @ApiResponse({ status: 200, description: 'Message sent successfully' }) // Define Swagger response
  // @ApiBody({ type: ChatInputDto }) // Define Swagger request body
  // chatStreaming(@Body() chatInputDto: ChatInputDto): Observable<string> {
  //   return this.genchatService.chat(chatInputDto);
  }
