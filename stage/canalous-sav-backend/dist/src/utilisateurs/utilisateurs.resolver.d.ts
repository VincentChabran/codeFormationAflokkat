import { UtilisateursService } from "./utilisateurs.service";
import { Utilisateur } from "./entities/utilisateur.entity";
import { CreateUtilisateurInput } from "./dto/create-utilisateur.input";
import { UpdateUtilisateurInput } from "./dto/update-utilisateur.input";
import { NotificationsService } from "src/notifications/notifications.service";
import { PubSubEngine } from "graphql-subscriptions";
export declare class UtilisateursResolver {
    private readonly utilisateursService;
    private readonly notificationsService;
    private pubSub;
    constructor(utilisateursService: UtilisateursService, notificationsService: NotificationsService, pubSub: PubSubEngine);
    createUtilisateur(createUtilisateurInput: CreateUtilisateurInput): Promise<Utilisateur>;
    findAll(): Promise<Utilisateur[]>;
    findOne(email: string): Promise<Utilisateur>;
    updateUtilisateur(updateUtilisateurInput: UpdateUtilisateurInput): Promise<{
        access_token: string;
        utilisateur: Utilisateur;
    }>;
    removeUtilisateurNotification(id: number, notificationId: number): Promise<Utilisateur>;
    removeUtilisateur(id: number): Promise<import("typeorm").DeleteResult>;
}
