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
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const mail_templates_service_1 = require("../mail-templates/mail-templates.service");
let MailService = class MailService {
    constructor(mailerService, mailTemplatesService) {
        this.mailerService = mailerService;
        this.mailTemplatesService = mailTemplatesService;
    }
    async sendRetourQuestionnaireMail(destinataire, sujet, message) {
        let success = true;
        await this.mailerService
            .sendMail({
            to: "vincent.chabran@hotmail.fr",
            from: "agobertquentin@gmail.com",
            template: "retourQuestionnaire",
            subject: sujet,
            context: {
                message,
            },
        })
            .then((res) => {
            console.log(res);
            success = true;
        })
            .catch((err) => {
            console.log(err);
            success = false;
        });
        return success;
    }
    async sendMailToBases(destinataires) {
        const message = (await this.mailTemplatesService.findOne(5)).fr;
        await this.mailerService
            .sendMail({
            to: "vincent.chabran@hotmail.fr",
            from: "agobertquentin@gmail.com",
            template: "rapportBases",
            subject: "Les Canalous Service Client - Demande de rapport concernant une réclamation",
            context: {
                message,
            },
        })
            .then((res) => console.log(res, destinataires))
            .catch((err) => console.log(err));
    }
    async sendMailWhenCreatingReclamation(destinataire, langue) {
        const message = await this.mailTemplatesService.findOne(6);
        await this.mailerService
            .sendMail({
            to: "vincent.chabran@hotmail.fr",
            from: "agobertquentin@gmail.com",
            template: "creerReclamation",
            subject: "Les Canalous Service Client - Prise en compte de votre réclamation",
            context: {
                message: langue === "fr" ? message.fr : langue === "en" ? message.en : message.de,
            },
        })
            .then((res) => {
            console.log(res, destinataire);
            console.log(langue);
        })
            .catch((err) => console.log(err));
    }
    async sendMail(destinataire, sujet, nom, reclamationId, propositionId, geste, message) {
        let success = true;
        await this.mailerService
            .sendMail({
            to: "vincent.chabran@hotmail.fr",
            from: "agobertquentin@gmail.com",
            subject: sujet,
            template: "validationClient",
            context: {
                message,
                nom,
                geste,
                reclamationId,
                propositionId,
            },
        })
            .then((res) => {
            success = true;
            console.log(res);
        })
            .catch((err) => {
            success = false;
            console.log(err);
        });
        return success;
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService, mail_templates_service_1.MailTemplatesService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map