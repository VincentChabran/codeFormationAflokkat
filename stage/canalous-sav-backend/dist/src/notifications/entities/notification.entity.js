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
exports.NewNotification = exports.IdsForReFetching = exports.Notification = void 0;
const graphql_1 = require("@nestjs/graphql");
const reclamation_entity_1 = require("../../reclamations/entities/reclamation.entity");
const utilisateur_entity_1 = require("../../utilisateurs/entities/utilisateur.entity");
const typeorm_1 = require("typeorm");
let Notification = class Notification {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "notification", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Notification.prototype, "reclamationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reclamation_entity_1.Reclamation, (reclamation) => reclamation.notifications, {
        lazy: true,
        onDelete: "CASCADE",
    }),
    (0, graphql_1.Field)(() => reclamation_entity_1.Reclamation),
    __metadata("design:type", Promise)
], Notification.prototype, "reclamation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Notification.prototype, "utilisateurId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.notifications, {
        lazy: true,
        cascade: true,
        onDelete: "CASCADE",
    }),
    (0, graphql_1.Field)(() => utilisateur_entity_1.Utilisateur),
    __metadata("design:type", Promise)
], Notification.prototype, "utilisateur", void 0);
Notification = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Notification);
exports.Notification = Notification;
let IdsForReFetching = class IdsForReFetching {
};
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    __metadata("design:type", Array)
], IdsForReFetching.prototype, "ids", void 0);
IdsForReFetching = __decorate([
    (0, graphql_1.ObjectType)()
], IdsForReFetching);
exports.IdsForReFetching = IdsForReFetching;
let NewNotification = class NewNotification {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], NewNotification.prototype, "id", void 0);
NewNotification = __decorate([
    (0, graphql_1.ObjectType)()
], NewNotification);
exports.NewNotification = NewNotification;
//# sourceMappingURL=notification.entity.js.map