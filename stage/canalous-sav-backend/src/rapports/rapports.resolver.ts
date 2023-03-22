import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { RapportsService } from "./rapports.service";
import { Rapport } from "./entities/rapport.entity";
import { CreateRapportInput } from "./dto/create-rapport.input";
import { UpdateRapportInput } from "./dto/update-rapport.input";
import { PubSubEngine } from "graphql-subscriptions";
import { NotificationsService } from "src/notifications/notifications.service";
import { Inject } from "@nestjs/common";
import { LogsService } from "src/logs/logs.service";

interface Participants {
   id: number;
}

@Resolver(() => Rapport)
export class RapportsResolver {
   constructor(
      private readonly rapportsService: RapportsService,
      private readonly notificationsService: NotificationsService,
      private readonly logsService: LogsService,
      @Inject("PUB_SUB") private pubSub: PubSubEngine
   ) {}

   @Mutation(() => Rapport)
   async createRapport(@Args("createRapportInput") createRapportInput: CreateRapportInput) {
      const newRapport = await this.rapportsService.create(createRapportInput);

      const participants = await (await newRapport.reclamation).participants;

      for (let i = 0; i < participants.length; i++) {
         if (createRapportInput.auteurId !== participants[i].id) {
            await this.notificationsService.create({
               notification: `De nouveaux rapports sont disponibles pour la réclamation #${newRapport.reclamationId}`,
               reclamationId: newRapport.reclamationId,
               utilisateurId: participants[i].id,
            });

            this.pubSub.publish("sendNotification", {
               sendNotification: { id: participants[i].id },
            });
         }
         this.pubSub.publish("newRapportNotification", {
            newRapportNotification: { id: participants[i].id },
         });
      }

      const participantsIds = participants.map(({ id }: Participants) => {
         return id;
      });

      this.pubSub.publish("refetching", {
         refetching: { ids: participantsIds },
      });

      await this.logsService.create({
         reclamationId: createRapportInput.reclamationId,
         log: `Rapport créé par ${(await newRapport.auteur).nom}`,
      });

      return newRapport;
   }

   @Query(() => [Rapport], { name: "rapports" })
   findAll() {
      return this.rapportsService.findAll();
   }

   @Query(() => Rapport, { name: "rapport" })
   findOne(@Args("id", { type: () => Int }) id: number) {
      return this.rapportsService.findOne(id);
   }

   @Mutation(() => Rapport)
   async updateRapport(@Args("updateRapportInput") updateRapportInput: UpdateRapportInput) {
      return await this.rapportsService.update(updateRapportInput.id, updateRapportInput);
   }

   @Mutation(() => Rapport)
   async removeRapport(@Args("id", { type: () => Int }) id: number) {
      return await this.rapportsService.remove(id);
   }
}
