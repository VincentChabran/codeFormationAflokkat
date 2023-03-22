import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateReclamationInput {
    @Field()
    reclamation: string;

    @Field(() => Int)
    clientId: number;

    @Field(() => Int)
    responsableId: number;
}
