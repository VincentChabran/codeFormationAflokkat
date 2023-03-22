import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsEmail, IsLowercase, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
// import { TypeContrat } from './enum/TypeContrat';

@InputType()
export class CreateOffreEmploiInput {
   @IsNotEmpty()
   @IsString()
   @Field()
   nomDuPoste: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   nomEntreprise: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   ville: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   typeContrat: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   domaineActivite: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   descriptionEntreprise: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   descriptionPoste: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   descriptionProfilCandidat: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   experienceSouhaitee: string;

   @IsOptional()
   @IsString()
   @Field()
   remuneration: string;

   @IsOptional()
   @IsEmail()
   // @IsLowercase({ message: 'Email doit étre en minuscule' })
   @Field({ nullable: true })
   emailContact?: string;

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   pathLienCandidature?: string;

   @IsOptional()
   @IsDate()
   @Field({ nullable: true })
   dateDebut?: Date;

   @IsOptional()
   @IsDate()
   @Field({ nullable: true })
   dateLimiteCandidature?: Date;

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   pathLogo?: string;

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   pathPieceJointe?: string;

   // Relations

   @IsNotEmpty()
   @IsNumber()
   @Field(() => Int)
   userCreateurId: number;
}
