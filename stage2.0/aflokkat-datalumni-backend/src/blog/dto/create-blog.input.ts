import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBlogInput {
   @IsNotEmpty()
   @IsString()
   @Field()
   title: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   categorie: string;

   @IsNotEmpty()
   @IsString()
   @Field()
   content: string;

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   pathImg?: string;

   // Relations

   @IsNotEmpty()
   @IsNumber()
   @Field(() => Int)
   userCreateurId: number;
}
