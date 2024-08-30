import { Test, TestingModule } from '@nestjs/testing';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { UpdateAccountInput } from './dto/update-account.input';
import { CreateAccountInput } from './dto/create-account.input';
import * as Chance from 'chance';
import { Schema as MongooSchema } from 'mongoose';

const userId = new MongooSchema.Types.ObjectId('');
const chance = new Chance();
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
const updateAccount: UpdateAccountInput = {
  _id: userId,
  user_name: chance.name(),
};
describe('AccountResolver', () => {
  let resolver: AccountResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountResolver,
        {
          provide: AccountService,
          useValue: {
            createAccount: jest.fn(() => {
              return {
                _id: userId,
                ...createAccount,
              };
            }),
            findAll: jest.fn(() => {
              return [
                {
                  _id: userId,
                  ...createAccount,
                },
              ];
            }),
            getAccountById: jest.fn(() => {
              return {
                _id: userId,
                ...createAccount,
              };
            }),
            updateAccount: jest.fn(() => {
              return {
                _id: userId,
                ...createAccount,
                ...updateAccount,
              };
            }),
            remove: jest.fn(() => {
              return {};
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<AccountResolver>(AccountResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
