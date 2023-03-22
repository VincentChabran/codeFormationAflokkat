import { CreateOffreEmploiInput } from './create-offre-emploi.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BeforeUpdate } from 'typeorm';

@InputType()
export class UpdateOffreEmploiInput extends PartialType(CreateOffreEmploiInput) {
   @IsNotEmpty()
   @IsNumber()
   @Field(() => Int)
   id: number;

   @IsOptional()
   @IsBoolean()
   @Field(() => Boolean, { nullable: true })
   active?: boolean;

   @IsEmpty()
   userCreateurId: number;
}
