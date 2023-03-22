import { Reclamation } from "src/reclamations/entities/reclamation.entity";
export declare class Reservation {
    id: number;
    prix: number;
    bateau: string;
    basedepart: number;
    basearrivee: number;
    nombasedepart: string;
    nombasearrivee: string;
    datedepart: string;
    datearrivee: string;
    reclamation: Promise<Reclamation>;
}
