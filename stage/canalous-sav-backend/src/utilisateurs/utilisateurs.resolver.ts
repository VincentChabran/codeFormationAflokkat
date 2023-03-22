import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UtilisateursService } from "./utilisateurs.service";
import { Utilisateur } from "./entities/utilisateur.entity";
import { CreateUtilisateurInput } from "./dto/create-utilisateur.input";
import { UpdateUtilisateurInput } from "./dto/update-utilisateur.input";
import { Inject } from "@nestjs/common";
import { NotificationsService } from "src/notifications/notifications.service";
import { PubSubEngine } from "graphql-subscriptions";
import { LoginResponse } from "src/auth/dto/login-response";

interface Directions {
   id: number;
}

@Resolver(() => Utilisateur)
export class UtilisateursResolver {
   constructor(
      private readonly utilisateursService: UtilisateursService,
      private readonly notificationsService: NotificationsService,
      @Inject("PUB_SUB") private pubSub: PubSubEngine
   ) {}

   @Mutation(() => Utilisateur)
   async createUtilisateur(
      @Args("createUtilisateurInput")
      createUtilisateurInput: CreateUtilisateurInput
   ) {
      return await this.utilisateursService.create(createUtilisateurInput);
   }

   @Query(() => [Utilisateur], { name: "utilisateurs" })
   findAll() {
      return this.utilisateursService.findAll();
   }

   @Query(() => Utilisateur, { name: "utilisateur" })
   findOne(@Args("email") email: string) {
      return this.utilisateursService.findOne(email);
   }

   @Mutation(() => LoginResponse)
   async updateUtilisateur(
      @Args("updateUtilisateurInput")
      updateUtilisateurInput: UpdateUtilisateurInput
   ) {
      return await this.utilisateursService.update(updateUtilisateurInput.id, updateUtilisateurInput);
   }

   @Mutation(() => Utilisateur)
   async removeUtilisateurNotification(
      @Args("id", { type: () => Int }) id: number,
      @Args("notificationId", { type: () => Int }) notificationId: number
   ) {
      const updatedUtilisateur = await this.utilisateursService.removeUtilisateurNotification(id, notificationId);

      await this.notificationsService.remove(notificationId);

      this.pubSub.publish("sendNotification", {
         sendNotification: {
            notifications: await this.notificationsService.getNotificationsById(id),
         },
      });

      return updatedUtilisateur;
   }

   @Mutation(() => Utilisateur)
   async removeUtilisateur(@Args("id", { type: () => Int }) id: number) {
      // const directions = await this.utilisateursService.findAllDirection();

      // const directionsIds = directions.map(({ id }: Directions) => {
      //   return id;
      // });

      // this.pubSub.publish("refetching", {
      //   refetching: { ids: directionsIds },
      // });

      return this.utilisateursService.remove(id);
   }
}
