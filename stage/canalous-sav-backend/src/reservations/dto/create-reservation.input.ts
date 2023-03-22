import { InputType, Int, Field, Float } from "@nestjs/graphql";

@InputType()
export class CreateReservationInput {
    @Field(() => Int)
    id: number;

    @Field(() => Float)
    prix: number;

    @Field()
    bateau: string;

    @Field(() => Int)
    basedepart: number;

    @Field(() => Int)
    basearrivee: number;

    @Field()
    nombasedepart: string;

    @Field()
    nombasearrivee: string;

    @Field()
    datedepart: string;

    @Field()
    datearrivee: string;
}
