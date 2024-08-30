import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AdminService,
  JwtServiceFactory,
  PlantFormService,
} from './jwt.factory';

@Injectable()
export class AuthService {
  private jwtService: PlantFormService;
  private jwtAdminService: AdminService;
  private nonce: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtServiceFactory: JwtServiceFactory,
  ) {
    this.jwtService = jwtServiceFactory.createPlantFormJwtService();
    this.jwtAdminService = jwtServiceFactory.createAdminJwtService();
    this.nonce = this.configService.getOrThrow('NONCE');
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  generateAdminToken(account: {
    uid: any;
    email: any;
    username: any;
    avatar: any;
    nonce: any;
  }) {
    if (
      account.email.split('@').length === 2 &&
      account.email.split('@')[0] === 'undefinedemail'
    ) {
      account.email = null;
    }

    return {
      accessToken: this.jwtAdminService.sign({
        sub: account.uid,
        aud: 'admin_account_center',
        uid: account.uid,
        email: account.email,
        username: account.username,
        avatar: account.avatar,
        nonce: this.nonce,
      }),
    };
  }

  generateToken(account: {
    uid: any;
    email: any;
    username: any;
    avatar: any;
    nonce: any;
  }) {
    if (
      account.email.split('@').length === 2 &&
      account.email.split('@')[0] === 'undefinedemail'
    ) {
      account.email = null;
    }

    return {
      accessToken: this.jwtService.sign({
        sub: account.uid,
        aud: 'ambrus_account_center',
        uid: account.uid,
        email: account.email,
        username: account.username,
        avatar: account.avatar,
        nonce: this.nonce,
      }),
    };
  }
}
