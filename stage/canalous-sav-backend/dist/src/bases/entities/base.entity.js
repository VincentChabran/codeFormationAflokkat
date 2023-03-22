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
exports.ReservationBis = exports.Base = void 0;
const graphql_1 = require("@nestjs/graphql");
const reclamation_entity_1 = require("../../reclamations/entities/reclamation.entity");
const utilisateur_entity_1 = require("../../utilisateurs/entities/utilisateur.entity");
const typeorm_1 = require("typeorm");
let Base = class Base {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Base.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Base.prototype, "zone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Base.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Base.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Base.prototype, "chef", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Base.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Base.prototype, "tel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Base.prototype, "responsableId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.bases, {
        lazy: true,
        onDelete: "SET NULL",
    }),
    (0, graphql_1.Field)(() => utilisateur_entity_1.Utilisateur),
    __metadata("design:type", Promise)
], Base.prototype, "responsable", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => reclamation_entity_1.Reclamation, (reclamation) => reclamation.bases, {
        lazy: true,
    }),
    (0, typeorm_1.JoinTable)(),
    (0, graphql_1.Field)(() => [reclamation_entity_1.Reclamation]),
    __metadata("design:type", Promise)
], Base.prototype, "reclamations", void 0);
Base = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Base);
exports.Base = Base;
let ReservationBis = class ReservationBis {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ReservationBis.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ReservationBis.prototype, "datecreation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ReservationBis.prototype, "datedepart", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ReservationBis.prototype, "datearrivee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationBis.prototype, "prix", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ReservationBis.prototype, "nomclient", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ReservationBis.prototype, "numclient", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ReservationBis.prototype, "bateau", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ReservationBis.prototype, "basedepart", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ReservationBis.prototype, "basearrivee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ReservationBis.prototype, "nombasedepart", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ReservationBis.prototype, "nombasearrivee", void 0);
ReservationBis = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], ReservationBis);
exports.ReservationBis = ReservationBis;
//# sourceMappingURL=base.entity.js.map