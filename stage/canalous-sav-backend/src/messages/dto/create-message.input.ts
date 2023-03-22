import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateMessageInput {
    @Field()
    message: string;

    @Field(() => Int)
    auteurId: number;

    @Field(() => Int)
    reclamationId: number;
}
