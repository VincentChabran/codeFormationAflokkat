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
exports.QuestionnairesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const questionnaires_service_1 = require("./questionnaires.service");
const questionnaire_entity_1 = require("./entities/questionnaire.entity");
const create_questionnaire_input_1 = require("./dto/create-questionnaire.input");
const update_questionnaire_input_1 = require("./dto/update-questionnaire.input");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const axios_1 = require("@nestjs/axios");
const reservations_service_1 = require("../reservations/reservations.service");
const api_1 = require("../utils/api");
let QuestionnairesResolver = class QuestionnairesResolver {
    constructor(questionnairesService, reservationsService, httpService) {
        this.questionnairesService = questionnairesService;
        this.reservationsService = reservationsService;
        this.httpService = httpService;
    }
    async createQuestionnaire(createQuestionnaireInput) {
        return this.questionnairesService.create(createQuestionnaireInput);
    }
    async fetchNewQuestionnaires() {
        let lastId;
        let questionnaire = await this.questionnairesService.getLastId();
        if (questionnaire)
            lastId = questionnaire.id;
        else
            lastId = 2499;
        const newQuestionnaires = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${api_1.api}/questionnairesFrom${lastId}`).pipe((0, operators_1.map)((res) => res.data)));
        for (let i = 0; i < newQuestionnaires.length; i++) {
            const { numreservation, prix, bateau, datedepart, datearrivee, basedepart, basearrivee, nombasedepart, nombasearrivee, } = await this.questionnairesService.create(Object.assign(Object.assign({}, newQuestionnaires[i]), { statut: "Non consulté" }));
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
    async findAll() {
        return this.questionnairesService.findAll();
    }
    async findOne(id) {
        return this.questionnairesService.findOne(id);
    }
    async updateQuestionnaire(updateQuestionnaireInput) {
        return this.questionnairesService.update(updateQuestionnaireInput.id, updateQuestionnaireInput);
    }
    async removeQuestionnaire(id) {
        return this.questionnairesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => questionnaire_entity_1.Questionnaire),
    __param(0, (0, graphql_1.Args)("createQuestionnaireInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_questionnaire_input_1.CreateQuestionnaireInput]),
    __metadata("design:returntype", Promise)
], QuestionnairesResolver.prototype, "createQuestionnaire", null);
__decorate([
    (0, graphql_1.Query)(() => [questionnaire_entity_1.Questionnaire]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionnairesResolver.prototype, "fetchNewQuestionnaires", null);
__decorate([
    (0, graphql_1.Query)(() => [questionnaire_entity_1.Questionnaire], { name: "questionnaires" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionnairesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => questionnaire_entity_1.Questionnaire, { name: "questionnaire" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionnairesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => questionnaire_entity_1.Questionnaire),
    __param(0, (0, graphql_1.Args)("updateQuestionnaireInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_questionnaire_input_1.UpdateQuestionnaireInput]),
    __metadata("design:returntype", Promise)
], QuestionnairesResolver.prototype, "updateQuestionnaire", null);
__decorate([
    (0, graphql_1.Mutation)(() => questionnaire_entity_1.Questionnaire),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionnairesResolver.prototype, "removeQuestionnaire", null);
QuestionnairesResolver = __decorate([
    (0, graphql_1.Resolver)(() => questionnaire_entity_1.Questionnaire),
    __metadata("design:paramtypes", [questionnaires_service_1.QuestionnairesService,
        reservations_service_1.ReservationsService,
        axios_1.HttpService])
], QuestionnairesResolver);
exports.QuestionnairesResolver = QuestionnairesResolver;
//# sourceMappingURL=questionnaires.resolver.js.map