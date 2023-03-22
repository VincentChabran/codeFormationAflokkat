import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsLowercase, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { UserRole } from './enum/UserRole';

@InputType()
export class CreateUserInput {
   @IsNotEmpty()
   @IsEmail()
   @IsLowercase()
   @Field()
   email: string;

   @IsNotEmpty()
   @IsString()
   @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
   @Length(6)
   @Field()
   password: string;

   @IsNotEmpty()
   @IsString()
   @Matches("^([ \u00c0-\u01ffa-zA-Z'-])+$")
   @Field()
   nom: string;

   @IsNotEmpty()
   @IsString()
   @Matches("^([ \u00c0-\u01ffa-zA-Z'-])+$")
   @Field()
   prenom: string;

   @IsNotEmpty()
   @Field(() => [UserRole])
   roles: UserRole[];

   @IsOptional()
   @IsBoolean()
   @Field(() => Boolean, { nullable: true })
   isActive?: boolean;
}
