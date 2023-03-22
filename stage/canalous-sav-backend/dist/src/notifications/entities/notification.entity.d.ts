import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
export declare class Notification {
    id: number;
    notification: string;
    reclamationId: number;
    reclamation: Promise<Reclamation>;
    utilisateurId: number;
    utilisateur: Promise<Utilisateur>;
}
export declare class IdsForReFetching {
    ids: number[];
}
export declare class NewNotification {
    id: number;
}
