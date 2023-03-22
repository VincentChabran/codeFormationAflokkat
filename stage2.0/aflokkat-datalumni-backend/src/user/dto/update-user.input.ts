import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
   @IsNotEmpty()
   @IsNumber()
   @Field(() => Int)
   id: number;

   @IsOptional()
   @IsBoolean()
   @Field(() => Boolean, { nullable: true })
   mentor?: boolean;

   @IsOptional()
   @IsBoolean()
   @Field(() => Boolean, { nullable: true })
   rechercheEmploi?: boolean;

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   profilPictureName?: string;

   @IsOptional()
   @IsString()
   @Matches(/^\+[1-9]\d{1,14}$/) // need un test
   @Field({ nullable: true })
   telephone?: string;

   @IsOptional()
   @IsDate() //"1995-12-15"
   @Field({ nullable: true })
   dateDeNaissance?: Date;
}
