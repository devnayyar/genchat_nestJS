import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GenchatModule } from './genchat/genchat.module';
import { ThrottlerModule,ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.DB_URL),
  ThrottlerModule.forRoot([{
    ttl: 6,
    limit: 2,
  }]),
  AuthModule,
  GenchatModule],
  controllers: [AppController],
  providers: [
    AppService,
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
],
})
export class AppModule {}
