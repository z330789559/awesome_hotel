import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { Account, AccountSchema } from './entities/account.entity';
import * as Chance from 'chance';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../common/mongoose.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Schema as MongooSchema } from 'mongoose';

const chance = new Chance();
let userId = new MongooSchema.Types.ObjectId('');
const password = chance.string({ length: 8 });
export const createAccount: CreateAccountInput = {
  user_name: chance.name(),
  email: chance.email(),
  password: password,
  confirm_password: password,
  phone: chance.phone(),
  vip_level: 1,
  status: 0,
};

export const updateAccount: UpdateAccountInput = {
  _id: userId,
  user_name: chance.name(),
  email: chance.email(),
};

describe('AccountService', () => {
  let service: AccountService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          {
            name: Account.name,
            schema: AccountSchema,
          },
        ]),
      ],
      providers: [AccountService, ConfigService],
    }).compile();
    service = module.get<AccountService>(AccountService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeInMongodConnection();
    }
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('it should create account successfully', async () => {
    const account = await service.create(createAccount);
    userId = account._id;
    expect(account).toBeDefined();
    expect(account.user_name).toBe(createAccount.user_name);
    expect(account.phone).toBe(createAccount.phone);
    expect(account.email).toBe(createAccount.email);
    expect(account.password).not.toBeNull();
    console.log('account', account);
    updateAccount._id = account._id;
  });

  it('it should find all accounts successfully', async () => {
    const paginationQuery = { skip: 0, limit: 10 };
    const accounts = await service.findAll(paginationQuery);
    expect(accounts.length).toBeGreaterThan(0);
  });

  it('it shpould update account successfully', async () => {
    console.log('updateAccountId', updateAccount._id);
    const account = await service.update(updateAccount._id, updateAccount);
    expect(account).toBeDefined();
    expect(account.user_name).toBe(updateAccount.user_name);
    console.log('account', account);
    expect(account.email).toBe(updateAccount.email);
  });
});
