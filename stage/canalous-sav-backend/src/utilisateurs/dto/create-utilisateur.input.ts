import { InputType, Field } from "@nestjs/graphql";
import { IsAlpha, IsEmail } from "class-validator";

@InputType()
export class CreateUtilisateurInput {
   @Field()
   nom: string;

   @IsEmail()
   @Field()
   email: string;

   @Field()
   password: string;

   @Field()
   role: string;
}
