import { LogsService } from "src/logs/logs.service";
import { MailService } from "./mail.service";
export declare class MailResolver {
    private readonly mailService;
    private readonly logsService;
    constructor(mailService: MailService, logsService: LogsService);
    sendRetourQuestionnaireEmail(destinataire: string, sujet: string, message: string): Promise<Boolean>;
    sendEmail(destinataire: string, sujet: string, nom: string, reclamationId: number, propositionId: number, geste: string, message: string): Promise<Boolean>;
}
