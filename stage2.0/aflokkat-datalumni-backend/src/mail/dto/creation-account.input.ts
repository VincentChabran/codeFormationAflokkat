import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsLowercase, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

@InputType()
export class CreationAccountInput {
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
   @IsString()
   @IsEmail()
   @IsLowercase({ message: 'Email doit étre en minuscule' })
   @Field()
   email: string;

   @IsNotEmpty()
   @IsString()
   @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
   @Length(6)
   @Field()
   password: string;
}
