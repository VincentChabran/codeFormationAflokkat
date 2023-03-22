import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsLowercase, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
   @IsNotEmpty()
   @IsEmail()
   @IsLowercase()
   @Field()
   email: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   password: string;
}
