import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtServiceFactory } from './jwt.factory';

@Module({
  imports: [ConfigModule, PassportModule],
  providers: [AuthService, JwtStrategy, JwtServiceFactory],
  exports: [AuthService, JwtServiceFactory],
})
export class AuthModule {}
