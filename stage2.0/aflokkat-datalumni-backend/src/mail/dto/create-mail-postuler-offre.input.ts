import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsLowercase, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

@InputType()
export class CreateMailPostulerOffreInput {
   @IsNotEmpty()
   @IsString()
   @Field()
   nomDuPoste: string;

   @IsNotEmpty()
   @IsString()
   @IsEmail()
   @Field()
   destinataire: string;

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

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   message?: string;
}
