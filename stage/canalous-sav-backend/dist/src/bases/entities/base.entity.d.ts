import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
export declare class Base {
    id: number;
    zone: number;
    nom: string;
    adresse: string;
    chef: string;
    email: string;
    tel: string;
    responsableId: number;
    responsable: Promise<Utilisateur>;
    reclamations: Promise<Reclamation[]>;
}
export declare class ReservationBis {
    id: number;
    datecreation: string;
    datedepart: string;
    datearrivee: string;
    prix: number;
    nomclient: string;
    numclient: number;
    bateau: string;
    basedepart: number;
    basearrivee: number;
    nombasedepart: string;
    nombasearrivee: string;
}
