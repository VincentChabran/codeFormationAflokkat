import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ReclamationsService } from "./reclamations.service";
import { Reclamation } from "./entities/reclamation.entity";
import { CreateReclamationInput } from "./dto/create-reclamation.input";
import { UpdateReclamationInput } from "./dto/update-reclamation.input";
import { Utilisateur, UtilisateurInput } from "src/utilisateurs/entities/utilisateur.entity";
import { NotificationsService } from "src/notifications/notifications.service";
import { PubSubEngine } from "graphql-subscriptions";
import { Inject } from "@nestjs/common";
import { LogsService } from "src/logs/logs.service";
import { UtilisateursService } from "src/utilisateurs/utilisateurs.service";
import { MailService } from "src/mail/mail.service";
import { Questionnaire } from "src/questionnaires/entities/questionnaire.entity";

interface Participants {
   id: number;
}

@Resolver(() => Reclamation)
export class ReclamationsResolver {
   constructor(
      private readonly reclamationsService: ReclamationsService,
      private readonly utilisateursService: UtilisateursService,
      private readonly notificationsService: NotificationsService,
      private readonly logsService: LogsService,
      private readonly mailService: MailService,
      @Inject("PUB_SUB") private pubSub: PubSubEngine
   ) {}

   @Mutation(() => Reclamation)
   async createReclamation(
      @Args("createReclamationInput")
      createReclamationInput: CreateReclamationInput,
      @Args("participants", { type: () => [UtilisateurInput] })
      participants: Utilisateur[],
      @Args("baseIds", { type: () => [Int] }) baseIds: number[],
      @Args("reservationId", { type: () => Int }) reservationId: number,
      @Args("questionnaireId", { type: () => Int, nullable: true })
      questionnaireId: number,
      @Args("langue", { nullable: true }) langue: string
   ): Promise<CreateReclamationInput> {
      const reclamation = await this.reclamationsService.create(
         createReclamationInput,
         participants,
         baseIds,
         questionnaireId,
         reservationId
      );

      const bases = await reclamation.bases;

      let basesEmails = [];
      for (let i = 0; i < bases.length; i++) {
         basesEmails.push(bases[i].email);
      }

      this.mailService.sendMailToBases({
         destinataires: basesEmails,
      });

      if (!questionnaireId) {
         const destinataire = await reclamation.client;
         this.mailService.sendMailWhenCreatingReclamation(destinataire, langue);
      }

      await this.logsService.create({
         reclamationId: reclamation.id,
         log: `Création de la réclamation #${reclamation.id}`,
      });

      const participantsIds = participants.map(({ id }: Participants) => {
         return id;
      });

      for (let i = 0; i < bases.length; i++) {
         await this.notificationsService.create({
            notification: `Vous devez remplir un rapport pour la réclamation #${reclamation.id}`,
            reclamationId: reclamation.id,
            utilisateurId: bases[i].responsableId,
         });

         this.pubSub.publish("sendNotification", {
            sendNotification: { id: bases[i].responsableId },
         });
      }

      this.pubSub.publish("refetching", {
         refetching: { ids: participantsIds },
      });

      return reclamation;
   }

   @Query(() => [Reclamation], { name: "reclamations" })
   findAll() {
      return this.reclamationsService.findAll();
   }

   @Query(() => Reclamation, { name: "reclamationByReservationId" })
   findByReservationId(@Args("id", { type: () => Int }) id: number) {
      return this.reclamationsService.findByReservationId(id);
   }

   @Query(() => Reclamation, { name: "reclamation" })
   findOne(@Args("id", { type: () => Int }) id: number) {
      return this.reclamationsService.findOne(id);
   }

   @Mutation(() => Questionnaire)
   async linkQuestionnaireToExistingReclamation(
      @Args("questionnaireId", { type: () => Int }) questionnaireId: number,
      @Args("reclamationId", { type: () => Int }) reclamationId: number
   ) {
      return await this.reclamationsService.linkQuestionnaireToExistingReclamation(questionnaireId, reclamationId);
   }

   // @Mutation(() => Reclamation)
   // async changeResponsableReclamation(@Args("update") pass) {}

   @Mutation(() => Reclamation)
   async updateReclamation(
      @Args("updateReclamationInput")
      updateReclamationInput: UpdateReclamationInput,
      @Args("newParticipants", { type: () => [UtilisateurInput] })
      newParticipants: Utilisateur[]
   ) {
      const updatedReclamation = await this.reclamationsService.update(
         updateReclamationInput.id,
         updateReclamationInput,
         newParticipants
      );

      if (updateReclamationInput.statut) {
         await this.logsService.create({
            reclamationId: updateReclamationInput.id,
            log: `Statut modifié : ${updateReclamationInput.statut}`,
         });
      }

      if (updateReclamationInput.geste) {
         await this.logsService.create({
            reclamationId: updateReclamationInput.id,
            log: `Geste commercial proposé aux participants : ${updateReclamationInput.geste}`,
         });
      }

      if (updateReclamationInput.responsableId) {
         await this.logsService.create({
            reclamationId: updateReclamationInput.id,
            log: `Nouveau responsable : ${(await updatedReclamation.responsable).nom}`,
         });
      }

      if (updateReclamationInput.statut === "Proposition du geste commercial") {
         const directionUtilisateurs = await this.utilisateursService.findAllDirectionButOne(
            updateReclamationInput.responsableId
         );
         for (let i = 0; i < directionUtilisateurs.length; i++) {
            await this.notificationsService.create({
               notification: `Vous devez valider le geste proposé pour la réclamation #${updateReclamationInput.id}`,
               reclamationId: updateReclamationInput.id,
               utilisateurId: directionUtilisateurs[i].id,
            });

            this.pubSub.publish("sendNotification", {
               sendNotification: { id: directionUtilisateurs[i].id },
            });
         }
      }

      for (let i = 0; i < newParticipants.length; i++) {
         await this.notificationsService.create({
            notification: `Vous avez été invité à prendre part à la réclamation #${updateReclamationInput.id}`,
            reclamationId: updateReclamationInput.id,
            utilisateurId: newParticipants[i].id,
         });

         this.pubSub.publish("sendNotification", {
            sendNotification: { id: newParticipants[i].id },
         });

         await this.logsService.create({
            reclamationId: updateReclamationInput.id,
            log: `Nouveau participant : ${newParticipants[i].nom}`,
         });
      }

      const participantsIds = (await updatedReclamation.participants).map(({ id }: Participants) => {
         return id;
      });

      this.pubSub.publish("refetching", {
         refetching: { ids: participantsIds },
      });

      return updatedReclamation;
   }

   @Mutation(() => Reclamation)
   removeParticipants(
      @Args("id", { type: () => Int }) id: number,
      @Args("participantToDeleteId", { type: () => Int })
      participantToDeleteId: number
   ) {
      return this.reclamationsService.removeParticipant(id, participantToDeleteId);
   }

   @Mutation(() => Reclamation)
   removeReclamation(@Args("id", { type: () => Int }) id: number) {
      return this.reclamationsService.remove(id);
   }
}
