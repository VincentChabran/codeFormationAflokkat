import { DeleteResult, Repository } from "typeorm";
import { CreateQuestionnaireInput } from "./dto/create-questionnaire.input";
import { UpdateQuestionnaireInput } from "./dto/update-questionnaire.input";
import { Questionnaire } from "./entities/questionnaire.entity";
export declare class QuestionnairesService {
    private questionnairesRepository;
    constructor(questionnairesRepository: Repository<Questionnaire>);
    create(createQuestionnaireInput: CreateQuestionnaireInput): Promise<Questionnaire>;
    getLastId(): Promise<Questionnaire>;
    findAll(): Promise<Questionnaire[]>;
    findOne(id: number): Promise<Questionnaire | null>;
    update(id: number, updateQuestionnaireInput: UpdateQuestionnaireInput): Promise<Questionnaire | null>;
    remove(id: number): Promise<DeleteResult>;
}
