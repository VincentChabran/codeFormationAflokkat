import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreatePropositionInput {
    @Field()
    geste: string;

    @Field()
    statut: string;

    @Field()
    reclamationId: number;
}
