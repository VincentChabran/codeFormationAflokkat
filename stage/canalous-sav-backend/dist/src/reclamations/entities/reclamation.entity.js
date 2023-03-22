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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reclamation = void 0;
const graphql_1 = require("@nestjs/graphql");
const base_entity_1 = require("../../bases/entities/base.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
const databaseFile_entity_1 = require("../../database-files/entities/databaseFile.entity");
const log_entity_1 = require("../../logs/entities/log.entity");
const message_entity_1 = require("../../messages/entities/message.entity");
const notification_entity_1 = require("../../notifications/entities/notification.entity");
const proposition_entity_1 = require("../../propositions/entities/proposition.entity");
const questionnaire_entity_1 = require("../../questionnaires/entities/questionnaire.entity");
const rapport_entity_1 = require("../../rapports/entities/rapport.entity");
const reservation_entity_1 = require("../../reservations/entities/reservation.entity");
const utilisateur_entity_1 = require("../../utilisateurs/entities/utilisateur.entity");
const typeorm_1 = require("typeorm");
let Reclamation = class Reclamation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Reclamation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Reclamation.prototype, "reclamation", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Nouvellement créée" }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Reclamation.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Reclamation.prototype, "geste", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Reclamation.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.reclamations, {
        lazy: true,
    }),
    (0, graphql_1.Field)(() => client_entity_1.Client),
    __metadata("design:type", Promise)
], Reclamation.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Reclamation.prototype, "responsableId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.estResponsable, {
        lazy: true,
    }),
    (0, graphql_1.Field)(() => utilisateur_entity_1.Utilisateur),
    __metadata("design:type", Promise)
], Reclamation.prototype, "responsable", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rapport_entity_1.Rapport, (rapport) => rapport.reclamation, { lazy: true }),
    (0, graphql_1.Field)(() => [rapport_entity_1.Rapport]),
    __metadata("design:type", Promise)
], Reclamation.prototype, "rapports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.reclamation, { lazy: true }),
    (0, graphql_1.Field)(() => [message_entity_1.Message]),
    __metadata("design:type", Promise)
], Reclamation.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proposition_entity_1.Proposition, (proposition) => proposition.reclamation, {
        lazy: true,
    }),
    (0, graphql_1.Field)(() => [proposition_entity_1.Proposition]),
    __metadata("design:type", Promise)
], Reclamation.prototype, "propositions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.reclamation, {
        lazy: true,
    }),
    (0, graphql_1.Field)(() => [notification_entity_1.Notification]),
    __metadata("design:type", Promise)
], Reclamation.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.participe, {
        lazy: true,
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
    }),
    (0, graphql_1.Field)(() => [utilisateur_entity_1.Utilisateur]),
    __metadata("design:type", Promise)
], Reclamation.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => base_entity_1.Base, (base) => base.reclamations, {
        lazy: true,
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
    }),
    (0, graphql_1.Field)(() => [base_entity_1.Base]),
    __metadata("design:type", Promise)
], Reclamation.prototype, "bases", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => log_entity_1.Log, (log) => log.reclamation, {
        lazy: true,
    }),
    (0, graphql_1.Field)(() => [log_entity_1.Log]),
    __metadata("design:type", Promise)
], Reclamation.prototype, "logs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => reservation_entity_1.Reservation, (reservation) => reservation.reclamation, {
        lazy: true,
    }),
    (0, graphql_1.Field)(() => reservation_entity_1.Reservation),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Promise)
], Reclamation.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => questionnaire_entity_1.Questionnaire, (questionnaire) => questionnaire.reclamation, {
        lazy: true,
        nullable: true,
    }),
    (0, graphql_1.Field)(() => questionnaire_entity_1.Questionnaire, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Promise)
], Reclamation.prototype, "questionnaire", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => databaseFile_entity_1.default, (databaseFile) => databaseFile.reclamation, {
        lazy: true,
    }),
    (0, graphql_1.Field)(() => [databaseFile_entity_1.default]),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Promise)
], Reclamation.prototype, "files", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reclamation.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Reclamation.prototype, "updatedAt", void 0);
Reclamation = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Reclamation);
exports.Reclamation = Reclamation;
//# sourceMappingURL=reclamation.entity.js.map