import { Base } from "src/bases/entities/base.entity";
import { Message } from "src/messages/entities/message.entity";
import { Notification } from "src/notifications/entities/notification.entity";
import { Rapport } from "src/rapports/entities/rapport.entity";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
export declare class Utilisateur {
    id: number;
    nom: string;
    email: string;
    password: string;
    role: string;
    bases: Promise<Base[]>;
    estResponsable: Promise<Reclamation[]>;
    rapports: Promise<Rapport[]>;
    messages: Promise<Message[]>;
    participe: Promise<Reclamation[]>;
    notifications: Promise<Notification[]>;
}
export declare class UtilisateurInput {
    id: number;
    nom: string;
    email: string;
    role: string;
}
