import { CreateExperienceProInput } from './create-experience-pro.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { BeforeUpdate } from 'typeorm';

@InputType()
export class UpdateExperienceProInput extends PartialType(CreateExperienceProInput) {
   @IsNotEmpty()
   @IsNumber()
   @Field(() => Int)
   id: number;

   @IsEmpty()
   userId: number;
}
