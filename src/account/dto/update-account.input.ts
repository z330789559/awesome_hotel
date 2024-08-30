import { CreateAccountInput } from './create-account.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field(() => String)
  @IsString()
  _id: MongooSchema.Types.ObjectId;
}
