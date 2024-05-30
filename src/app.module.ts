import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GenchatModule } from './genchat/genchat.module';
import { ThrottlerModule,ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
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
  controllers: [],
  providers: [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
],
}
)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the authentication guard to all routes except for sign-in and sign-up
    consumer
      .apply(AuthGuard('jwt'))
      .forRoutes({ path: 'genchat/chat', method: RequestMethod.ALL }); 
  }
}