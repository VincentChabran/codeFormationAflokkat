import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsLowercase, IsNotEmpty, IsString, Matches } from 'class-validator';

@InputType()
export class ValidationCreationAccountInput {
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

   // Email à qui le mail dois être envoyé
   @IsNotEmpty()
   @IsString()
   @IsEmail()
   @IsLowercase({ message: 'Email doit étre en minuscule' })
   @Field()
   emailContact: string;

   // Status de la creation du compte, ( valide ou invalide )
   @IsNotEmpty()
   @IsString()
   @Field()
   status: string;
}
