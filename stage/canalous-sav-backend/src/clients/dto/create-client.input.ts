import { InputType, Field, Int } from "@nestjs/graphql";
import { IsAlpha, IsEmail } from "class-validator";

@InputType()
export class CreateClientInput {
    @Field(() => Int)
    id: number;

    @Field()
    nom: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    tel?: string;

    @Field({ nullable: true })
    portable?: string;

    @Field({ nullable: true })
    adresse?: string;

    @Field({ nullable: true })
    codepostal?: string;

    @Field({ nullable: true })
    ville?: string;

    @Field({ nullable: true })
    pays?: string;
}
