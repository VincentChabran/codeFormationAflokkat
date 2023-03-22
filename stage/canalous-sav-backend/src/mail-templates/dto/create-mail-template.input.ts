import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateMailTemplateInput {
    @Field()
    nom: string;

    @Field()
    fr: string;

    @Field()
    en: string;

    @Field()
    de: string;
}
