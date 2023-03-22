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
exports.RapportsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const rapports_service_1 = require("./rapports.service");
const rapport_entity_1 = require("./entities/rapport.entity");
const create_rapport_input_1 = require("./dto/create-rapport.input");
const update_rapport_input_1 = require("./dto/update-rapport.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const notifications_service_1 = require("../notifications/notifications.service");
const common_1 = require("@nestjs/common");
const logs_service_1 = require("../logs/logs.service");
let RapportsResolver = class RapportsResolver {
    constructor(rapportsService, notificationsService, logsService, pubSub) {
        this.rapportsService = rapportsService;
        this.notificationsService = notificationsService;
        this.logsService = logsService;
        this.pubSub = pubSub;
    }
    async createRapport(createRapportInput) {
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
        const participantsIds = participants.map(({ id }) => {
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
    findAll() {
        return this.rapportsService.findAll();
    }
    findOne(id) {
        return this.rapportsService.findOne(id);
    }
    async updateRapport(updateRapportInput) {
        return await this.rapportsService.update(updateRapportInput.id, updateRapportInput);
    }
    async removeRapport(id) {
        return await this.rapportsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => rapport_entity_1.Rapport),
    __param(0, (0, graphql_1.Args)("createRapportInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rapport_input_1.CreateRapportInput]),
    __metadata("design:returntype", Promise)
], RapportsResolver.prototype, "createRapport", null);
__decorate([
    (0, graphql_1.Query)(() => [rapport_entity_1.Rapport], { name: "rapports" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RapportsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => rapport_entity_1.Rapport, { name: "rapport" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RapportsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => rapport_entity_1.Rapport),
    __param(0, (0, graphql_1.Args)("updateRapportInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_rapport_input_1.UpdateRapportInput]),
    __metadata("design:returntype", Promise)
], RapportsResolver.prototype, "updateRapport", null);
__decorate([
    (0, graphql_1.Mutation)(() => rapport_entity_1.Rapport),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RapportsResolver.prototype, "removeRapport", null);
RapportsResolver = __decorate([
    (0, graphql_1.Resolver)(() => rapport_entity_1.Rapport),
    __param(3, (0, common_1.Inject)("PUB_SUB")),
    __metadata("design:paramtypes", [rapports_service_1.RapportsService,
        notifications_service_1.NotificationsService,
        logs_service_1.LogsService,
        graphql_subscriptions_1.PubSubEngine])
], RapportsResolver);
exports.RapportsResolver = RapportsResolver;
//# sourceMappingURL=rapports.resolver.js.map