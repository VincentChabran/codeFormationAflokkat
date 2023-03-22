import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
export declare class Rapport {
    id: number;
    clientImmobilise: boolean;
    clientImmobiliseRaison: string;
    dureeImmobilisation: string;
    gesteCommercial: boolean;
    geste: string;
    montantGeste: number;
    sinistre: boolean;
    natureSinistre: string;
    rapport: string;
    auteurId?: number;
    auteur?: Promise<Utilisateur>;
    reclamationId: number;
    reclamation: Promise<Reclamation>;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Validation {
    message: String;
}
