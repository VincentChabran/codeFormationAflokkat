import { CreateRapportInput } from "./create-rapport.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateRapportInput extends PartialType(CreateRapportInput) {
    @Field(() => Int)
    id: number;
}
