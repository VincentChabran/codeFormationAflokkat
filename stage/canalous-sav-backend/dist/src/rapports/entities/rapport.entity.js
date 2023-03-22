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
exports.Validation = exports.Rapport = void 0;
const graphql_1 = require("@nestjs/graphql");
const reclamation_entity_1 = require("../../reclamations/entities/reclamation.entity");
const utilisateur_entity_1 = require("../../utilisateurs/entities/utilisateur.entity");
const typeorm_1 = require("typeorm");
let Rapport = class Rapport {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Rapport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Rapport.prototype, "clientImmobilise", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Rapport.prototype, "clientImmobiliseRaison", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Rapport.prototype, "dureeImmobilisation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Rapport.prototype, "gesteCommercial", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Rapport.prototype, "geste", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Rapport.prototype, "montantGeste", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Rapport.prototype, "sinistre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Rapport.prototype, "natureSinistre", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Rapport.prototype, "rapport", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Rapport.prototype, "auteurId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.rapports, {
        lazy: true,
        onDelete: "SET NULL",
    }),
    (0, graphql_1.Field)(() => utilisateur_entity_1.Utilisateur, { nullable: true }),
    __metadata("design:type", Promise)
], Rapport.prototype, "auteur", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Rapport.prototype, "reclamationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reclamation_entity_1.Reclamation, (reclamation) => reclamation.rapports, {
        lazy: true,
        onDelete: "CASCADE",
    }),
    (0, graphql_1.Field)(() => reclamation_entity_1.Reclamation),
    __metadata("design:type", Promise)
], Rapport.prototype, "reclamation", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Rapport.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Rapport.prototype, "updatedAt", void 0);
Rapport = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Rapport);
exports.Rapport = Rapport;
let Validation = class Validation {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Validation.prototype, "message", void 0);
Validation = __decorate([
    (0, graphql_1.ObjectType)()
], Validation);
exports.Validation = Validation;
//# sourceMappingURL=rapport.entity.js.map