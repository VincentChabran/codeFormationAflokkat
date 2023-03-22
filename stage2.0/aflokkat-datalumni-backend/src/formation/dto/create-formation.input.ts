import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
// import { ObtentionEnum } from './enum/ObtentionEnum';
// import { TypeDiplome } from './enum/TypeDiplome';

@InputType()
export class CreateFormationInput {
   @IsNotEmpty()
   @IsString()
   @Field()
   nomFormation: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   typeDiplome: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   nomEtablissement: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   obtention: string;

   @IsNotEmpty()
   @IsNumber()
   @Min(1900)
   @Max(4000)
   @Field(() => Int)
   anneeObtention: number;

   @IsNotEmpty()
   @IsString()
   @Field()
   domaineActivite: string;

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   description?: string;

   @IsNotEmpty()
   @IsNumber()
   @Field(() => Int)
   userId: number;
}
