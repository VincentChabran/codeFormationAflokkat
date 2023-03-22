import { ReclamationsService } from "./reclamations.service";
import { Reclamation } from "./entities/reclamation.entity";
import { CreateReclamationInput } from "./dto/create-reclamation.input";
import { UpdateReclamationInput } from "./dto/update-reclamation.input";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import { NotificationsService } from "src/notifications/notifications.service";
import { PubSubEngine } from "graphql-subscriptions";
import { LogsService } from "src/logs/logs.service";
import { UtilisateursService } from "src/utilisateurs/utilisateurs.service";
import { MailService } from "src/mail/mail.service";
import { Questionnaire } from "src/questionnaires/entities/questionnaire.entity";
export declare class ReclamationsResolver {
    private readonly reclamationsService;
    private readonly utilisateursService;
    private readonly notificationsService;
    private readonly logsService;
    private readonly mailService;
    private pubSub;
    constructor(reclamationsService: ReclamationsService, utilisateursService: UtilisateursService, notificationsService: NotificationsService, logsService: LogsService, mailService: MailService, pubSub: PubSubEngine);
    createReclamation(createReclamationInput: CreateReclamationInput, participants: Utilisateur[], baseIds: number[], reservationId: number, questionnaireId: number, langue: string): Promise<CreateReclamationInput>;
    findAll(): Promise<Reclamation[]>;
    findByReservationId(id: number): Promise<Reclamation>;
    findOne(id: number): Promise<Reclamation>;
    linkQuestionnaireToExistingReclamation(questionnaireId: number, reclamationId: number): Promise<Questionnaire>;
    updateReclamation(updateReclamationInput: UpdateReclamationInput, newParticipants: Utilisateur[]): Promise<Reclamation>;
    removeParticipants(id: number, participantToDeleteId: number): Promise<Reclamation>;
    removeReclamation(id: number): Promise<Reclamation>;
}
