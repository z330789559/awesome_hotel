import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';
import { PassWordMatches } from '../../utils/validators';

@InputType()
export class CreateAccountInput {
  @Field({ description: 'user_name' })
  @IsString()
  user_name: string;

  @Field({ description: 'password' })
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @Field({ description: 'email' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @Field({ description: 'phone' })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @ValidateIf((o) => o.phone) // Optional: Only validate if phone is provided
  phone: string;

  @Field({ description: 'confirm_password' })
  @IsString()
  @IsNotEmpty({ message: 'Confirm password should not be empty' })
  @MinLength(8, {
    message: 'Confirm password must be at least 8 characters long',
  })
  @PassWordMatches('password', { message: 'Passwords do not match' }) // Matches password field
  confirm_password: string;
  @Field({ description: 'vip_level', defaultValue: 1 })
  vip_level: number;

  @Field({ description: 'status', defaultValue: 0 })
  status: number;
}
