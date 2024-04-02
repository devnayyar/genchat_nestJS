import { Module } from '@nestjs/common';
import { GenchatService } from './genchat.service';
import { GenchatController } from './genchat.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[ConfigModule,AuthModule],
  providers: [GenchatService],
  controllers: [GenchatController]
})
export class GenchatModule {}
