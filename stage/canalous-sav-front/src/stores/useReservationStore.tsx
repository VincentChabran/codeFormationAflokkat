import create from "zustand";

interface ReservationInput {
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
interface ReservationState {
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
    setReservation: (reservation: ReservationInput) => void;
    resetReservation: () => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
    id: 0,
    datecreation: "",
    datedepart: "",
    datearrivee: "",
    prix: 0,
    nomclient: "",
    numclient: 0,
    bateau: "",
    basedepart: 0,
    basearrivee: 0,
    nombasedepart: "",
    nombasearrivee: "",
    setReservation: ({
        id,
        datecreation,
        datedepart,
        datearrivee,
        prix,
        nomclient,
        numclient,
        bateau,
        basedepart,
        basearrivee,
        nombasedepart,
        nombasearrivee,
    }: ReservationInput) =>
        set((state) => ({
            ...state,
            id,
            datecreation,
            datedepart,
            datearrivee,
            prix,
            nomclient,
            numclient,
            bateau,
            basedepart,
            basearrivee,
            nombasedepart,
            nombasearrivee,
        })),
    resetReservation: () =>
        set(() => ({
            id: 0,
            datecreation: "",
            datedepart: "",
            datearrivee: "",
            prix: 0,
            nomclient: "",
            numclient: 0,
            bateau: "",
            basedepart: 0,
            basearrivee: 0,
            nombasedepart: "",
            nombasearrivee: "",
        })),
}));
