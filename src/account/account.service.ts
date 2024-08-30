import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from './entities/account.entity';
import { Model, Schema as MongooSchema } from 'mongoose';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<AccountDocument>,
  ) {}
  create(createAccountInput: CreateAccountInput) {
    return new this.accountModel(createAccountInput).save();
  }

  findAll({ skip, limit }: { skip: number; limit: number }) {
    return this.accountModel.find().skip(skip).limit(limit).exec();
  }

  findOne(id: MongooSchema.Types.ObjectId) {
    return this.accountModel.findById(id).exec();
  }

  update(
    id: MongooSchema.Types.ObjectId,
    updateAccountInput: UpdateAccountInput,
  ) {
    return this.accountModel
      .findByIdAndUpdate(id, updateAccountInput, {
        new: true,
      })
      .exec();
  }

  remove(id: MongooSchema.Types.ObjectId) {
    return this.accountModel.deleteOne({ _id: id });
  }
}
