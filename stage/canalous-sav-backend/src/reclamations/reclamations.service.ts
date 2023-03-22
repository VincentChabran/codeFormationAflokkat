import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BasesService } from "src/bases/bases.service";
import { DatabaseFilesService } from "src/database-files/database-files.service";
import { Questionnaire } from "src/questionnaires/entities/questionnaire.entity";
import { QuestionnairesService } from "src/questionnaires/questionnaires.service";
import { ReservationsService } from "src/reservations/reservations.service";
import { Utilisateur, UtilisateurInput } from "src/utilisateurs/entities/utilisateur.entity";
import { UtilisateursService } from "src/utilisateurs/utilisateurs.service";
import { DeleteResult, Repository } from "typeorm";
import { CreateReclamationInput } from "./dto/create-reclamation.input";
import { UpdateReclamationInput } from "./dto/update-reclamation.input";
import { Reclamation } from "./entities/reclamation.entity";

@Injectable()
export class ReclamationsService {
   constructor(
      @InjectRepository(Reclamation)
      private reclamationsRepository: Repository<Reclamation>,
      private readonly utilisateursService: UtilisateursService,
      private readonly basesService: BasesService,
      private readonly reservationsService: ReservationsService,
      private readonly questionnairesService: QuestionnairesService,
      private readonly databaseFilesService: DatabaseFilesService
   ) {}

   async create(
      createReclamationInput: CreateReclamationInput,
      participants: Utilisateur[],
      baseIds: number[],
      questionnaireId: number,
      reservationId: number
   ) {
      const newReclamation = this.reclamationsRepository.create(createReclamationInput);

      const directionMembers = await this.utilisateursService.findAllDirectionButOne(
         createReclamationInput.responsableId
      );
      for (let i = 0; i < directionMembers.length; i++) {
         participants.push(directionMembers[i]);
      }

      const bases = await this.basesService.findAllWithIds(baseIds);
      newReclamation.bases = Promise.resolve(bases);

      for (let i = 0; i < bases.length; i++) {
         const baseParticipant = await bases[i].responsable;
         participants.push(baseParticipant);
      }
      bases.forEach((base) => {
         base.responsable;
      });
      newReclamation.participants = Promise.resolve(participants);

      const reservation = await this.reservationsService.findOne(reservationId);
      newReclamation.reservation = Promise.resolve(reservation);

      if (questionnaireId) {
         const questionnaire = await this.questionnairesService.findOne(questionnaireId);

         if (questionnaire) newReclamation.questionnaire = Promise.resolve(questionnaire);
      }

      return await this.reclamationsRepository.save(newReclamation);
   }

   async createFromQuestionnaire(createReclamationInput: CreateReclamationInput, questionnaireId: number) {
      const newReclamation = this.reclamationsRepository.create(createReclamationInput);

      const questionnaire = await this.questionnairesService.findOne(questionnaireId);

      newReclamation.questionnaire = Promise.resolve(questionnaire);

      return await this.reclamationsRepository.save(newReclamation);
   }

   async findAll(): Promise<Reclamation[]> {
      return await this.reclamationsRepository.find();
   }

   async findByReservationId(id: number): Promise<Reclamation | null> {
      return await this.reclamationsRepository.findOne({
         where: {
            reservation: {
               id,
            },
         },
      });
   }

   async findByResponsableId(id: number): Promise<Reclamation[]> {
      return await this.reclamationsRepository.find({
         where: { responsableId: id },
      });
   }

   async findOne(id: number): Promise<Reclamation | null> {
      return await this.reclamationsRepository.findOneOrFail(id);
   }

   async linkQuestionnaireToExistingReclamation(
      questionnaireId: number,
      reclamationId: number
   ): Promise<Questionnaire> {
      const questionnaire = await this.questionnairesService.findOne(questionnaireId);
      const reclamation = await this.reclamationsRepository.findOne(reclamationId);

      reclamation.questionnaire = Promise.resolve(questionnaire);
      await this.reclamationsRepository.save(reclamation);

      await this.questionnairesService.update(questionnaireId, {
         id: questionnaireId,
         statut: "Réclamation",
      });

      return await this.questionnairesService.findOne(questionnaireId);
   }

   async update(
      id: number,
      updateReclamationInput: UpdateReclamationInput,
      newParticipants: UtilisateurInput[]
   ): Promise<Reclamation | null> {
      const reclamation = await this.reclamationsRepository.findOneOrFail(id);

      const participants = await reclamation.participants;
      participants.push.apply(participants, newParticipants);

      reclamation.participants = Promise.resolve(participants);

      await this.reclamationsRepository.save(reclamation);
      await this.reclamationsRepository.update(id, updateReclamationInput);

      return await this.reclamationsRepository.findOne(id);
   }

   // async addFile(id: number, imageBuffer: Buffer, filename: string) {
   //   const file = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
   // }

   async removeParticipant(id: number, participantToDeleteId: number): Promise<Reclamation | null> {
      const reclamation = await this.reclamationsRepository.findOneOrFail(id);

      const participants = await reclamation.participants;

      reclamation.participants = Promise.resolve(
         participants.filter((participant) => {
            return participant.id !== participantToDeleteId;
         })
      );

      await this.reclamationsRepository.save(reclamation);

      return await this.reclamationsRepository.findOne(id);
   }

   async remove(id: number): Promise<Reclamation> {
      const deleteReclamation = await this.reclamationsRepository.findOneOrFail(id);

      await this.reclamationsRepository.delete(id);

      return deleteReclamation;
   }
}
