import { InputType, Field, Int, Float } from "@nestjs/graphql";

@InputType()
export class CreateRapportInput {
    @Field(() => Boolean)
    clientImmobilise: boolean;

    @Field({ nullable: true })
    clientImmobiliseRaison: string;

    @Field({ nullable: true })
    dureeImmobilisation: string;

    @Field(() => Boolean)
    gesteCommercial: boolean;

    @Field({ nullable: true })
    geste: string;

    @Field(() => Float, { nullable: true })
    montantGeste: number;

    @Field(() => Boolean)
    sinistre: boolean;

    @Field({ nullable: true })
    natureSinistre: string;

    @Field({ nullable: true })
    rapport: string;

    @Field(() => Int)
    auteurId: number;

    @Field(() => Int)
    reclamationId: number;
}
