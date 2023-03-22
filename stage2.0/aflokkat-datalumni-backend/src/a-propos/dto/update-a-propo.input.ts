import { CreateAPropoInput } from './create-a-propo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAPropoInput extends PartialType(CreateAPropoInput) {
  @Field(() => Int)
  id: number;
}
