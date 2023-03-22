import { QuestionnairesService } from "./questionnaires.service";
import { Questionnaire } from "./entities/questionnaire.entity";
import { CreateQuestionnaireInput } from "./dto/create-questionnaire.input";
import { UpdateQuestionnaireInput } from "./dto/update-questionnaire.input";
import { HttpService } from "@nestjs/axios";
import { ReservationsService } from "src/reservations/reservations.service";
export declare class QuestionnairesResolver {
    private readonly questionnairesService;
    private readonly reservationsService;
    private httpService;
    constructor(questionnairesService: QuestionnairesService, reservationsService: ReservationsService, httpService: HttpService);
    createQuestionnaire(createQuestionnaireInput: CreateQuestionnaireInput): Promise<Questionnaire>;
    fetchNewQuestionnaires(): Promise<Questionnaire[]>;
    findAll(): Promise<Questionnaire[]>;
    findOne(id: number): Promise<Questionnaire>;
    updateQuestionnaire(updateQuestionnaireInput: UpdateQuestionnaireInput): Promise<Questionnaire>;
    removeQuestionnaire(id: number): Promise<import("typeorm").DeleteResult>;
}
