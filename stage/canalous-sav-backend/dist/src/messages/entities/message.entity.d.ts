import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
export declare class Message {
    id: number;
    message: string;
    auteurId?: number;
    auteur?: Promise<Utilisateur>;
    reclamationId: number;
    reclamation: Promise<Reclamation>;
    createdAt: Date;
    updatedAt: Date;
}
