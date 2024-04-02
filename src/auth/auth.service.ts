// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.createAndSaveUser(signUpDto);
    const accessToken = this.generateToken(user._id);
    const refreshToken = await this.refreshTokenService.generateRefreshToken(user._id);
    return { accessToken, refreshToken };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.findUserByEmail(loginDto.email);
    this.validateUser(user, loginDto.password);
    const accessToken = this.generateToken(user._id);
    const refreshToken = await this.refreshTokenService.generateRefreshToken(user._id);
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
    const userId = await this.refreshTokenService.validateRefreshToken(refreshToken);
    const accessToken = this.generateToken(userId);
    return { accessToken, refreshToken };
  }

  private async createAndSaveUser(signUpDto: SignUpDto): Promise<User> {
    const { username, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userModel.create({ username, email, password: hashedPassword });
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }

  private validateUser(user: User, password: string): void {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign({ id: userId });
  }
}
