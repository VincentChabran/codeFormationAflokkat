import { CreateBlogInput } from './create-blog.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsEmpty } from 'class-validator';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
   @Field(() => Int)
   id: number;

   @IsEmpty()
   userCreateurId: number;
}
