import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel('RefreshToken')
    private refreshTokenModel: Model<any>,
  ) {}

  async generateRefreshToken(userId: string): Promise<string> {
    // Generate a UUID as the refresh token
    const refreshToken = uuidv4();

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
}
