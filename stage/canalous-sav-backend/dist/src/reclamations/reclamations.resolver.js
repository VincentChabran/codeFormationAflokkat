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
exports.ReclamationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const reclamations_service_1 = require("./reclamations.service");
const reclamation_entity_1 = require("./entities/reclamation.entity");
const create_reclamation_input_1 = require("./dto/create-reclamation.input");
const update_reclamation_input_1 = require("./dto/update-reclamation.input");
const utilisateur_entity_1 = require("../utilisateurs/entities/utilisateur.entity");
const notifications_service_1 = require("../notifications/notifications.service");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
const logs_service_1 = require("../logs/logs.service");
const utilisateurs_service_1 = require("../utilisateurs/utilisateurs.service");
const mail_service_1 = require("../mail/mail.service");
const questionnaire_entity_1 = require("../questionnaires/entities/questionnaire.entity");
let ReclamationsResolver = class ReclamationsResolver {
    constructor(reclamationsService, utilisateursService, notificationsService, logsService, mailService, pubSub) {
        this.reclamationsService = reclamationsService;
        this.utilisateursService = utilisateursService;
        this.notificationsService = notificationsService;
        this.logsService = logsService;
        this.mailService = mailService;
        this.pubSub = pubSub;
    }
    async createReclamation(createReclamationInput, participants, baseIds, reservationId, questionnaireId, langue) {
        const reclamation = await this.reclamationsService.create(createReclamationInput, participants, baseIds, questionnaireId, reservationId);
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
        const participantsIds = participants.map(({ id }) => {
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
    findAll() {
        return this.reclamationsService.findAll();
    }
    findByReservationId(id) {
        return this.reclamationsService.findByReservationId(id);
    }
    findOne(id) {
        return this.reclamationsService.findOne(id);
    }
    async linkQuestionnaireToExistingReclamation(questionnaireId, reclamationId) {
        return await this.reclamationsService.linkQuestionnaireToExistingReclamation(questionnaireId, reclamationId);
    }
    async updateReclamation(updateReclamationInput, newParticipants) {
        const updatedReclamation = await this.reclamationsService.update(updateReclamationInput.id, updateReclamationInput, newParticipants);
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
            const directionUtilisateurs = await this.utilisateursService.findAllDirectionButOne(updateReclamationInput.responsableId);
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
        const participantsIds = (await updatedReclamation.participants).map(({ id }) => {
            return id;
        });
        this.pubSub.publish("refetching", {
            refetching: { ids: participantsIds },
        });
        return updatedReclamation;
    }
    removeParticipants(id, participantToDeleteId) {
        return this.reclamationsService.removeParticipant(id, participantToDeleteId);
    }
    removeReclamation(id) {
        return this.reclamationsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => reclamation_entity_1.Reclamation),
    __param(0, (0, graphql_1.Args)("createReclamationInput")),
    __param(1, (0, graphql_1.Args)("participants", { type: () => [utilisateur_entity_1.UtilisateurInput] })),
    __param(2, (0, graphql_1.Args)("baseIds", { type: () => [graphql_1.Int] })),
    __param(3, (0, graphql_1.Args)("reservationId", { type: () => graphql_1.Int })),
    __param(4, (0, graphql_1.Args)("questionnaireId", { type: () => graphql_1.Int, nullable: true })),
    __param(5, (0, graphql_1.Args)("langue", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reclamation_input_1.CreateReclamationInput, Array, Array, Number, Number, String]),
    __metadata("design:returntype", Promise)
], ReclamationsResolver.prototype, "createReclamation", null);
__decorate([
    (0, graphql_1.Query)(() => [reclamation_entity_1.Reclamation], { name: "reclamations" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReclamationsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => reclamation_entity_1.Reclamation, { name: "reclamationByReservationId" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReclamationsResolver.prototype, "findByReservationId", null);
__decorate([
    (0, graphql_1.Query)(() => reclamation_entity_1.Reclamation, { name: "reclamation" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReclamationsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => questionnaire_entity_1.Questionnaire),
    __param(0, (0, graphql_1.Args)("questionnaireId", { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)("reclamationId", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ReclamationsResolver.prototype, "linkQuestionnaireToExistingReclamation", null);
__decorate([
    (0, graphql_1.Mutation)(() => reclamation_entity_1.Reclamation),
    __param(0, (0, graphql_1.Args)("updateReclamationInput")),
    __param(1, (0, graphql_1.Args)("newParticipants", { type: () => [utilisateur_entity_1.UtilisateurInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_reclamation_input_1.UpdateReclamationInput, Array]),
    __metadata("design:returntype", Promise)
], ReclamationsResolver.prototype, "updateReclamation", null);
__decorate([
    (0, graphql_1.Mutation)(() => reclamation_entity_1.Reclamation),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)("participantToDeleteId", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ReclamationsResolver.prototype, "removeParticipants", null);
__decorate([
    (0, graphql_1.Mutation)(() => reclamation_entity_1.Reclamation),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReclamationsResolver.prototype, "removeReclamation", null);
ReclamationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => reclamation_entity_1.Reclamation),
    __param(5, (0, common_1.Inject)("PUB_SUB")),
    __metadata("design:paramtypes", [reclamations_service_1.ReclamationsService,
        utilisateurs_service_1.UtilisateursService,
        notifications_service_1.NotificationsService,
        logs_service_1.LogsService,
        mail_service_1.MailService,
        graphql_subscriptions_1.PubSubEngine])
], ReclamationsResolver);
exports.ReclamationsResolver = ReclamationsResolver;
//# sourceMappingURL=reclamations.resolver.js.map