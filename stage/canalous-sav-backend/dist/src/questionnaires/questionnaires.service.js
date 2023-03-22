"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnairesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const questionnaire_entity_1 = require("./entities/questionnaire.entity");
let QuestionnairesService = class QuestionnairesService {
    constructor(questionnairesRepository) {
        this.questionnairesRepository = questionnairesRepository;
    }
    async create(createQuestionnaireInput) {
        const questionnaire = this.questionnairesRepository.create(createQuestionnaireInput);
        return await this.questionnairesRepository.save(questionnaire);
    }
    async getLastId() {
        return await this.questionnairesRepository.findOne({
            order: { id: "DESC" },
            select: ["id"],
        });
    }
    async findAll() {
        return await this.questionnairesRepository.find({
            order: { id: "DESC" },
        });
    }
    async findOne(id) {
        return await this.questionnairesRepository.findOneOrFail(id);
    }
    async update(id, updateQuestionnaireInput) {
        await this.questionnairesRepository.findOneOrFail(id);
        await this.questionnairesRepository.update(id, updateQuestionnaireInput);
        return await this.questionnairesRepository.findOne(id);
    }
    async remove(id) {
        return await this.questionnairesRepository.delete(id);
    }
};
QuestionnairesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(questionnaire_entity_1.Questionnaire)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuestionnairesService);
exports.QuestionnairesService = QuestionnairesService;
//# sourceMappingURL=questionnaires.service.js.map