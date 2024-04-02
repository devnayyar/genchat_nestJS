// refresh-token.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel('RefreshToken')
    private refreshTokenModel: Model<any>,
  ) {}

  async generateRefreshToken(userId: string): Promise<string> {
    // Generate a random refresh token
    const refreshToken = this.generateRandomToken();

    // Save the refresh token to the database
    await this.refreshTokenModel.create({ userId, token: refreshToken });

    return refreshToken;
  }

  async validateRefreshToken(token: string): Promise<string> {
    // Check if the refresh token exists in the database
    const refreshTokenDoc = await this.refreshTokenModel.findOne({ token });

    if (!refreshTokenDoc) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Return the userId associated with the refresh token
    return refreshTokenDoc.userId;
  }

  private generateRandomToken(): string {
    // Generate a random alphanumeric token
    const tokenLength = 64;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      token += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return token;
  }
}
