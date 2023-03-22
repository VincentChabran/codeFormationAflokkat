import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateQuestionnaireInput } from "./dto/create-questionnaire.input";
import { UpdateQuestionnaireInput } from "./dto/update-questionnaire.input";
import { Questionnaire } from "./entities/questionnaire.entity";

@Injectable()
export class QuestionnairesService {
    constructor(
        @InjectRepository(Questionnaire)
        private questionnairesRepository: Repository<Questionnaire>
    ) {}

    async create(createQuestionnaireInput: CreateQuestionnaireInput): Promise<Questionnaire> {
        const questionnaire = this.questionnairesRepository.create(createQuestionnaireInput);

        return await this.questionnairesRepository.save(questionnaire);
    }

    async getLastId(): Promise<Questionnaire> {
        return await this.questionnairesRepository.findOne({
            order: { id: "DESC" },
            select: ["id"],
        });
    }

    async findAll(): Promise<Questionnaire[]> {
        return await this.questionnairesRepository.find({
            order: { id: "DESC" },
        });
    }

    async findOne(id: number): Promise<Questionnaire | null> {
        return await this.questionnairesRepository.findOneOrFail(id);
    }

    async update(id: number, updateQuestionnaireInput: UpdateQuestionnaireInput): Promise<Questionnaire | null> {
        await this.questionnairesRepository.findOneOrFail(id);
        await this.questionnairesRepository.update(id, updateQuestionnaireInput);
        return await this.questionnairesRepository.findOne(id);
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.questionnairesRepository.delete(id);
    }
}
