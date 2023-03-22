import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsLowercase, IsNotEmpty, IsString, Matches } from 'class-validator';

@InputType()
export class DemandeCreationAccountInput {
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
}
