import { Reclamation } from "src/reclamations/entities/reclamation.entity";
export declare class Proposition {
    id: number;
    geste: string;
    statut: string;
    commentaire: string;
    reclamationId: number;
    reclamation: Promise<Reclamation>;
    createdAt: Date;
}
