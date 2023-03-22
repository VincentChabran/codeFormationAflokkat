import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAPropoInput {
   @IsNotEmpty()
   @IsString()
   @Field()
   message: string;
}
