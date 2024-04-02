// auth.controller.ts

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/refresh-token')
  refreshTokens(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.refreshTokens(refreshToken);
  }
}
