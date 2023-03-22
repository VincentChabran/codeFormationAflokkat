import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { MailTemplatesService } from "src/mail-templates/mail-templates.service";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService, private readonly mailTemplatesService: MailTemplatesService) {}

    async sendRetourQuestionnaireMail(destinataire: string, sujet: string, message: string): Promise<Boolean> {
        let success = true;
        await this.mailerService
            .sendMail({
                // to: [destinataire],
                // from: "contact@france-passion-plaisance.fr",
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

    async sendMailToBases(destinataires: any) {
        const message = (await this.mailTemplatesService.findOne(5)).fr;
        await this.mailerService
            .sendMail({
                // to: destinataires,
                // from: "contact@france-passion-plaisance.fr",
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

    async sendMailWhenCreatingReclamation(destinataire: any, langue: any) {
        const message = await this.mailTemplatesService.findOne(6);
        await this.mailerService
            .sendMail({
                // to: destinataire,
                // from: "contact@france-passion-plaisance.fr",
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

    async sendMail(
        destinataire: string,
        sujet: string,
        nom: string,
        reclamationId: number,
        propositionId: number,
        geste: string,
        message: string
    ): Promise<Boolean> {
        let success = true;
        await this.mailerService
            .sendMail({
                // to: destinataire,
                // from: "contact@france-passion-plaisance.fr",
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
}
