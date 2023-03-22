import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { QuestionnairesService } from "./questionnaires.service";
import { Questionnaire } from "./entities/questionnaire.entity";
import { CreateQuestionnaireInput } from "./dto/create-questionnaire.input";
import { UpdateQuestionnaireInput } from "./dto/update-questionnaire.input";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "@nestjs/axios";
import { ReservationsService } from "src/reservations/reservations.service";
import { api } from "src/utils/api";

@Resolver(() => Questionnaire)
export class QuestionnairesResolver {
   constructor(
      private readonly questionnairesService: QuestionnairesService,
      private readonly reservationsService: ReservationsService,
      private httpService: HttpService
   ) {}

   @Mutation(() => Questionnaire)
   async createQuestionnaire(
      @Args("createQuestionnaireInput")
      createQuestionnaireInput: CreateQuestionnaireInput
   ) {
      return this.questionnairesService.create(createQuestionnaireInput);
   }

   @Query(() => [Questionnaire])
   async fetchNewQuestionnaires() {
      let lastId: any;
      let questionnaire = await this.questionnairesService.getLastId();
      if (questionnaire) lastId = questionnaire.id;
      else lastId = 2499;
      const newQuestionnaires = await firstValueFrom(
         this.httpService.get(`${api}/questionnairesFrom${lastId}`).pipe(map((res) => res.data))
      );

      for (let i = 0; i < newQuestionnaires.length; i++) {
         const {
            numreservation,
            prix,
            bateau,
            datedepart,
            datearrivee,
            basedepart,
            basearrivee,
            nombasedepart,
            nombasearrivee,
         } = await this.questionnairesService.create({
            ...newQuestionnaires[i],
            statut: "Non consulté",
         });
         await this.reservationsService.create({
            id: numreservation,
            prix,
            bateau,
            datedepart,
            datearrivee,
            basedepart,
            basearrivee,
            nombasedepart,
            nombasearrivee,
         });
      }

      return await this.questionnairesService.findAll();
   }

   @Query(() => [Questionnaire], { name: "questionnaires" })
   async findAll() {
      return this.questionnairesService.findAll();
   }

   @Query(() => Questionnaire, { name: "questionnaire" })
   async findOne(@Args("id", { type: () => Int }) id: number) {
      return this.questionnairesService.findOne(id);
   }

   @Mutation(() => Questionnaire)
   async updateQuestionnaire(
      @Args("updateQuestionnaireInput")
      updateQuestionnaireInput: UpdateQuestionnaireInput
   ) {
      return this.questionnairesService.update(updateQuestionnaireInput.id, updateQuestionnaireInput);
   }

   @Mutation(() => Questionnaire)
   async removeQuestionnaire(@Args("id", { type: () => Int }) id: number) {
      return this.questionnairesService.remove(id);
   }
}
