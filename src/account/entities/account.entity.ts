import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@ObjectType()
@Schema()
export class Account {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;
  @Field(() => Int, { description: 'register time' })
  @Prop()
  register_time: number;
  @Field(() => String)
  @Prop()
  user_name: string;
  @Field(() => String)
  @Prop()
  password: string;
  @Field(() => String)
  @Prop({ unique: true })
  email: string;
  @Field(() => String)
  @Prop()
  phone: string;
  @Field(() => Int, { description: 'vip level ' })
  @Prop()
  vip_level: number;
  @Field(() => Int, { description: 'status 0 default active, 1  locked' })
  @Prop()
  status: number;
}
@ObjectType()
export class LoginAccountResponseR {
  @Field(() => Account)
  user: Account;

  @Field(() => String)
  authToken: string;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
