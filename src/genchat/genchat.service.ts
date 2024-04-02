import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatInputDto } from './dto/genchat.dto'; 
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Observable } from 'rxjs';

@Injectable()
export class GenchatService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  chat(chatInputDto: ChatInputDto): Observable<string> {
    return new Observable<string>(observer => {
      // Extract text from the DTO
      const userQuery = chatInputDto.text;

      // Use the Gemini API
      const geminiApiKey = this.configService.get<string>('GENMINI_API');

      // Initialize the Gemini instance with your API key
      const gemini = new GoogleGenerativeAI(geminiApiKey);

      // Construct the prompt by providing a context or question
      const prompt = `
      Prompt: "Explain ${userQuery} as if teaching to a 12-year-old student, focusing on the main context for easy understanding and scoring well in exams. Provide the explanation in the following format:
      start
      1. Provide a brief overview in simple terms (max 2-3 lines).
      2. List 10 key points or bullet points to explain the concept.
      3. Highlight 3 advantages or pros of understanding the concept.
      4. Discuss 3 disadvantages or cons of the concept.
      5. Summarize the key points for last-minute revision.
      end
      `;

      // Call Gemini methods to interact with the API
      const model = gemini.getGenerativeModel({ model: "gemini-pro" });

      // Generate content using prompt engineering
      model.generateContent(prompt)
        .then((res) => {
          const response = res.response;

          // Extract and emit the generated text
          observer.next(response.text());
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
