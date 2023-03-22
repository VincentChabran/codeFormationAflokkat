import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateDatabaseFileInput {
    @Field()
    filename: string;

    @Field(() => Int)
    reclamationId: number;
}
