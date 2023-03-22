import { CreateFormationInput } from './create-formation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

@InputType()
export class UpdateFormationInput extends PartialType(CreateFormationInput) {
   @IsNotEmpty()
   @IsNumber()
   @Field(() => Int)
   id: number;

   @IsEmpty()
   userId: number;
}
