import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Account, AccountSchema } from './entities/account.entity';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  providers: [AccountResolver, AccountService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  exports: [AccountService],
})
export class AccountModule {}
