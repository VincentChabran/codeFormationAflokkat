import { CreatePropositionInput } from "./create-proposition.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdatePropositionInput extends PartialType(CreatePropositionInput) {
    @Field(() => Int)
    id: number;

    @Field()
    statut: string;

    @Field({ nullable: true })
    commentaire: string;
}
