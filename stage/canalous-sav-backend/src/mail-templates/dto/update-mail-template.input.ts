import { CreateMailTemplateInput } from "./create-mail-template.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateMailTemplateInput extends PartialType(CreateMailTemplateInput) {
    @Field(() => Int)
    id: number;

    @Field({ nullable: true })
    nom?: string;

    @Field({ nullable: true })
    fr?: string;

    @Field({ nullable: true })
    en?: string;

    @Field({ nullable: true })
    de?: string;
}
