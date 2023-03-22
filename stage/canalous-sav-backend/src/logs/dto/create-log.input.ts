import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateLogInput {
    @Field()
    log: string;

    @Field(() => Int)
    reclamationId: number;
}
