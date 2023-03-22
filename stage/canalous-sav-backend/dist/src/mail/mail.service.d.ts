import { MailerService } from "@nestjs-modules/mailer";
import { MailTemplatesService } from "src/mail-templates/mail-templates.service";
export declare class MailService {
    private mailerService;
    private readonly mailTemplatesService;
    constructor(mailerService: MailerService, mailTemplatesService: MailTemplatesService);
    sendRetourQuestionnaireMail(destinataire: string, sujet: string, message: string): Promise<Boolean>;
    sendMailToBases(destinataires: any): Promise<void>;
    sendMailWhenCreatingReclamation(destinataire: any, langue: any): Promise<void>;
    sendMail(destinataire: string, sujet: string, nom: string, reclamationId: number, propositionId: number, geste: string, message: string): Promise<Boolean>;
}
