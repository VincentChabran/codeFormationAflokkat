import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateNotificationInput {
    @Field()
    notification: string;

    @Field(() => Int)
    reclamationId: number;

    @Field(() => Int)
    utilisateurId: number;
}
