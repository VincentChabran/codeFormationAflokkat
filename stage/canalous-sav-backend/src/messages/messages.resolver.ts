import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { MessagesService } from "./messages.service";
import { Message } from "./entities/message.entity";
import { CreateMessageInput } from "./dto/create-message.input";
import { UpdateMessageInput } from "./dto/update-message.input";
import { Inject } from "@nestjs/common";
import { PubSubEngine } from "graphql-subscriptions";
import { NotificationsService } from "src/notifications/notifications.service";

@Resolver(() => Message)
export class MessagesResolver {
   constructor(
      private readonly messagesService: MessagesService,
      private readonly notificationsService: NotificationsService,
      @Inject("PUB_SUB") private pubSub: PubSubEngine
   ) {}

   @Mutation(() => Message)
   async createMessage(@Args("createMessageInput") createMessageInput: CreateMessageInput) {
      const newMessage = await this.messagesService.create(createMessageInput);

      const participants = await (await newMessage.reclamation).participants;

      for (let i = 0; i < participants.length; i++) {
         if (createMessageInput.auteurId !== participants[i].id) {
            await this.notificationsService.create({
               notification: `De nouveaux messages sont disponibles pour la réclamation #${newMessage.reclamationId}.`,
               reclamationId: newMessage.reclamationId,
               utilisateurId: participants[i].id,
            });

            this.pubSub.publish("sendNotification", {
               sendNotification: { id: participants[i].id },
            });
         }

         this.pubSub.publish("newMessageNotification", {
            newMessageNotification: { id: participants[i].id },
         });
      }

      return newMessage;
   }

   @Query(() => [Message], { name: "messages" })
   findAll() {
      return this.messagesService.findAll();
   }

   @Query(() => Message, { name: "message" })
   findOne(@Args("id", { type: () => Int }) id: number) {
      return this.messagesService.findOne(id);
   }

   @Mutation(() => Message)
   async updateMessage(@Args("updateMessageInput") updateMessageInput: UpdateMessageInput) {
      return await this.messagesService.update(updateMessageInput.id, updateMessageInput);
   }

   @Mutation(() => Message)
   async removeMessage(@Args("id", { type: () => Int }) id: number) {
      return await this.messagesService.remove(id);
   }
}
