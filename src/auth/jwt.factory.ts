import { JwtModuleOptions } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlantFormService extends JwtService {}

@Injectable()
export class AdminService extends JwtService {}

@Injectable()
export class JwtServiceFactory {
  constructor(private readonly configService: ConfigService) {}

  createPlantFormJwtService(): PlantFormService {
    const options: JwtModuleOptions = {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      signOptions: {
        expiresIn: this.configService.get('JWT_EXPIRESIN_PLATFORM', '7d'),
      },
    };
    return new JwtService(options);
  }

  createAdminJwtService(): AdminService {
    const options: JwtModuleOptions = {
      secret: this.configService.getOrThrow('ADMIN_JWT_SECRET'),
      signOptions: {
        expiresIn: this.configService.get('JWT_EXPIRESIN_PLATFORM', '7d'),
      },
    };
    return new JwtService(options);
  }
}
