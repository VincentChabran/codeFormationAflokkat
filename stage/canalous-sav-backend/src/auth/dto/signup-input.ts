import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SignupUserInput {
    @Field()
    nom: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    role: string;
}
