import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateBaseInput {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    zone: number;

    @Field()
    nom: string;

    @Field()
    adresse: string;

    @Field()
    chef: string;

    @Field()
    email: string;

    @Field()
    tel: string;

    @Field(() => Int)
    responsableId: number;
}
