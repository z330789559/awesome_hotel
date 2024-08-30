import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '..//auth/jwt.guard';
import { Schema as MongooSchema } from 'mongoose';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Account)
  @UseGuards(JwtAuthGuard)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountService.create(createAccountInput);
  }

  @Query(() => [Account], { name: 'account' })
  findAll(skip = 0, limit = 10) {
    return this.accountService.findAll({ skip, limit });
  }

  @Query(() => Account, { name: 'account' })
  findOne(@Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId) {
    return this.accountService.findOne(id);
  }

  @Mutation(() => Account)
  updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    return this.accountService.update(
      updateAccountInput._id,
      updateAccountInput,
    );
  }

  @Mutation(() => Account)
  removeAccount(
    @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,
  ) {
    return this.accountService.remove(id);
  }
}
