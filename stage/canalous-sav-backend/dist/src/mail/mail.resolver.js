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
exports.MailResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const logs_service_1 = require("../logs/logs.service");
const mail_service_1 = require("./mail.service");
let MailResolver = class MailResolver {
    constructor(mailService, logsService) {
        this.mailService = mailService;
        this.logsService = logsService;
    }
    async sendRetourQuestionnaireEmail(destinataire, sujet, message) {
        const success = await this.mailService.sendRetourQuestionnaireMail(destinataire, sujet, message);
        return success;
    }
    async sendEmail(destinataire, sujet, nom, reclamationId, propositionId, geste, message) {
        const success = await this.mailService.sendMail(destinataire, sujet, nom, reclamationId, propositionId, geste, message);
        await this.logsService.create({
            reclamationId,
            log: "Envoi d'un mail au client",
        });
        return success;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("destinataire")),
    __param(1, (0, graphql_1.Args)("sujet")),
    __param(2, (0, graphql_1.Args)("message")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MailResolver.prototype, "sendRetourQuestionnaireEmail", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("destinataire")),
    __param(1, (0, graphql_1.Args)("sujet")),
    __param(2, (0, graphql_1.Args)("nom")),
    __param(3, (0, graphql_1.Args)("reclamationId")),
    __param(4, (0, graphql_1.Args)("propositionId")),
    __param(5, (0, graphql_1.Args)("geste")),
    __param(6, (0, graphql_1.Args)("message")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], MailResolver.prototype, "sendEmail", null);
MailResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [mail_service_1.MailService, logs_service_1.LogsService])
], MailResolver);
exports.MailResolver = MailResolver;
//# sourceMappingURL=mail.resolver.js.map