"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnairesModule = void 0;
const common_1 = require("@nestjs/common");
const questionnaires_service_1 = require("./questionnaires.service");
const questionnaires_resolver_1 = require("./questionnaires.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const questionnaire_entity_1 = require("./entities/questionnaire.entity");
const axios_1 = require("@nestjs/axios");
const reservations_module_1 = require("../reservations/reservations.module");
let QuestionnairesModule = class QuestionnairesModule {
};
QuestionnairesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([questionnaire_entity_1.Questionnaire]), axios_1.HttpModule, reservations_module_1.ReservationsModule],
        providers: [questionnaires_resolver_1.QuestionnairesResolver, questionnaires_service_1.QuestionnairesService],
        exports: [questionnaires_service_1.QuestionnairesService],
    })
], QuestionnairesModule);
exports.QuestionnairesModule = QuestionnairesModule;
//# sourceMappingURL=questionnaires.module.js.map