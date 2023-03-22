import { Reclamation } from "src/reclamations/entities/reclamation.entity";
export declare class Client {
    id: number;
    nom: string;
    email: string;
    tel?: string;
    portable?: string;
    adresse?: string;
    codepostal?: string;
    ville?: string;
    pays?: string;
    reclamations: Promise<Reclamation[]>;
}
