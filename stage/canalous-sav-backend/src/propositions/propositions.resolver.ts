import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PropositionsService } from "./propositions.service";
import { Proposition } from "./entities/proposition.entity";
import { CreatePropositionInput } from "./dto/create-proposition.input";
import { UpdatePropositionInput } from "./dto/update-proposition.input";
import { LogsService } from "src/logs/logs.service";
import { NotificationsService } from "src/notifications/notifications.service";
import { PubSubEngine } from "graphql-subscriptions";
import { Inject } from "@nestjs/common";

@Resolver(() => Proposition)
export class PropositionsResolver {
   constructor(
      private readonly propositionsService: PropositionsService,
      private readonly notificationsService: NotificationsService,
      private readonly logsService: LogsService,
      @Inject("PUB_SUB") private pubSub: PubSubEngine
   ) {}

   @Mutation(() => Proposition)
   async createProposition(
      @Args("createPropositionInput")
      createPropositionInput: CreatePropositionInput
   ) {
      const proposition = await this.propositionsService.create(createPropositionInput);

      await this.logsService.create({
         reclamationId: createPropositionInput.reclamationId,
         log: `Geste commercial proposé au client : ${createPropositionInput.geste}`,
      });

      return proposition;
   }

   @Query(() => [Proposition], { name: "proposition" })
   findAll() {
      return this.propositionsService.findAll();
   }

   @Query(() => Proposition, { name: "proposition" })
   findOne(@Args("id", { type: () => Int }) id: number) {
      return this.propositionsService.findOne(id);
   }

   // Public ici ?
   @Mutation(() => Proposition)
   async updateProposition(
      @Args("updatePropositionInput")
      updatePropositionInput: UpdatePropositionInput
   ) {
      const updatedProposition = await this.propositionsService.update(
         updatePropositionInput.id,
         updatePropositionInput
      );

      const participants = await (await updatedProposition.reclamation).participants;

      for (let i = 0; i < participants.length; i++) {
         await this.notificationsService.create({
            notification: `Réponse d'un client à une proposition de geste`,
            reclamationId: (await updatedProposition.reclamation).id,
            utilisateurId: participants[i].id,
         });

         this.pubSub.publish("sendNotification", {
            sendNotification: {
               id: participants[i].id,
            },
         });
      }

      await this.logsService.create({
         reclamationId: (await updatedProposition.reclamation).id,
         log: `Réponse du client : ${updatePropositionInput.statut}`,
      });

      return updatedProposition;
   }

   @Mutation(() => Proposition)
   removeProposition(@Args("id", { type: () => Int }) id: number) {
      return this.propositionsService.remove(id);
   }
}
