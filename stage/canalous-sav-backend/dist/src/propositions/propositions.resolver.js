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
exports.PropositionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const propositions_service_1 = require("./propositions.service");
const proposition_entity_1 = require("./entities/proposition.entity");
const create_proposition_input_1 = require("./dto/create-proposition.input");
const update_proposition_input_1 = require("./dto/update-proposition.input");
const logs_service_1 = require("../logs/logs.service");
const notifications_service_1 = require("../notifications/notifications.service");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
let PropositionsResolver = class PropositionsResolver {
    constructor(propositionsService, notificationsService, logsService, pubSub) {
        this.propositionsService = propositionsService;
        this.notificationsService = notificationsService;
        this.logsService = logsService;
        this.pubSub = pubSub;
    }
    async createProposition(createPropositionInput) {
        const proposition = await this.propositionsService.create(createPropositionInput);
        await this.logsService.create({
            reclamationId: createPropositionInput.reclamationId,
            log: `Geste commercial proposé au client : ${createPropositionInput.geste}`,
        });
        return proposition;
    }
    findAll() {
        return this.propositionsService.findAll();
    }
    findOne(id) {
        return this.propositionsService.findOne(id);
    }
    async updateProposition(updatePropositionInput) {
        const updatedProposition = await this.propositionsService.update(updatePropositionInput.id, updatePropositionInput);
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
    removeProposition(id) {
        return this.propositionsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => proposition_entity_1.Proposition),
    __param(0, (0, graphql_1.Args)("createPropositionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proposition_input_1.CreatePropositionInput]),
    __metadata("design:returntype", Promise)
], PropositionsResolver.prototype, "createProposition", null);
__decorate([
    (0, graphql_1.Query)(() => [proposition_entity_1.Proposition], { name: "proposition" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropositionsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => proposition_entity_1.Proposition, { name: "proposition" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PropositionsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => proposition_entity_1.Proposition),
    __param(0, (0, graphql_1.Args)("updatePropositionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_proposition_input_1.UpdatePropositionInput]),
    __metadata("design:returntype", Promise)
], PropositionsResolver.prototype, "updateProposition", null);
__decorate([
    (0, graphql_1.Mutation)(() => proposition_entity_1.Proposition),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PropositionsResolver.prototype, "removeProposition", null);
PropositionsResolver = __decorate([
    (0, graphql_1.Resolver)(() => proposition_entity_1.Proposition),
    __param(3, (0, common_1.Inject)("PUB_SUB")),
    __metadata("design:paramtypes", [propositions_service_1.PropositionsService,
        notifications_service_1.NotificationsService,
        logs_service_1.LogsService,
        graphql_subscriptions_1.PubSubEngine])
], PropositionsResolver);
exports.PropositionsResolver = PropositionsResolver;
//# sourceMappingURL=propositions.resolver.js.map