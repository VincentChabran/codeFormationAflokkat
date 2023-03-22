import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { NotificationsService } from "./notifications.service";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationInput } from "./dto/create-notification.input";
import { UpdateNotificationInput } from "./dto/update-notification.input";
import { PubSubEngine } from "graphql-subscriptions";
import { Inject } from "@nestjs/common";
import { LogsService } from "src/logs/logs.service";

@Resolver(() => Notification)
export class NotificationsResolver {
   constructor(
      private readonly notificationsService: NotificationsService,
      private readonly logsService: LogsService,
      @Inject("PUB_SUB") private pubSub: PubSubEngine
   ) {}

   @Mutation(() => Notification)
   async createNotification(
      @Args("createNotificationInput")
      createNotificationInput: CreateNotificationInput
   ): Promise<CreateNotificationInput> {
      const newNotification = await this.notificationsService.create(createNotificationInput);

      if (createNotificationInput.notification.includes("remplir un rapport")) {
         this.logsService.create({
            reclamationId: createNotificationInput.reclamationId,
            log: `Rapport demandé à ${(await newNotification.utilisateur).nom}`,
         });
      }

      this.pubSub.publish("sendNotification", {
         sendNotification: { id: createNotificationInput.utilisateurId },
      });

      return newNotification;
   }

   @Query(() => [Notification], { name: "notifications" })
   findAll() {
      return this.notificationsService.findAll();
   }

   @Query(() => Notification, { name: "notification" })
   findOne(@Args("id", { type: () => Int }) id: number) {
      return this.notificationsService.findOne(id);
   }

   @Query(() => Int)
   getNotificationsById(@Args("id", { type: () => Int }) id: number) {
      return this.notificationsService.getNotificationsById(id);
   }

   @Mutation(() => Notification)
   async updateNotification(
      @Args("updateNotificationInput")
      updateNotificationInput: UpdateNotificationInput
   ) {
      return await this.notificationsService.update(updateNotificationInput.id, updateNotificationInput);
   }

   @Mutation(() => Notification)
   async removeNotification(@Args("id", { type: () => Int }) id: number) {
      return await this.notificationsService.remove(id);
   }
}
