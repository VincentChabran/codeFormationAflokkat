import { Field, ObjectType } from "@nestjs/graphql";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";

@ObjectType()
export class LoginResponse {
   @Field()
   access_token: string;

   @Field(() => Utilisateur)
   utilisateur: Utilisateur;
}
