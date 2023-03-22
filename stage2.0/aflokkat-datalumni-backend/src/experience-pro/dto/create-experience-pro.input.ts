import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

@InputType()
export class CreateExperienceProInput {
   @IsNotEmpty()
   @IsString()
   @Matches("^([ \u00c0-\u01ffa-zA-Z'-])+$")
   @Field()
   fonction: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   entreprise: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   dateDebut: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   dateFin: string;

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   description?: string;

   @IsNotEmpty()
   @IsNumber()
   @Field(() => Int)
   userId: number;
}
