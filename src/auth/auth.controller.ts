import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@ApiTags('auth') // Add a tag to group related endpoints in Swagger UI
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered successfully' }) // Define Swagger response
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiBody({ type: SignUpDto }) // Define Swagger request body
  signUp(@Body() signUpDto: SignUpDto): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'User logged in successfully' }) // Define Swagger response
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto }) // Define Swagger request body
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/refresh-token')
  @ApiResponse({ status: HttpStatus.OK, description: 'Tokens refreshed successfully' }) // Define Swagger response
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid refresh token' })
  refreshTokens(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.refreshTokens(refreshToken);
  }
}
