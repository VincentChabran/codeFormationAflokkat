import create from "zustand";

interface ClientInput {
    id: number;
    nom: string;
    email: string;
    tel: string;
    portable: string;
    adresse: string;
    codepostal: string;
    ville: string;
    pays: string;
}
interface ClientState {
    id: number;
    nom: string;
    email: string;
    tel: string;
    portable: string;
    adresse: string;
    codepostal: string;
    ville: string;
    pays: string;
    setClient: (account: ClientInput) => void;
    // Ajout
    setEmail: (email: string) => void
    resetClient: () => void;
}

export const useClientStore = create<ClientState>((set) => ({
    id: 0,
    nom: "",
    email: "",
    tel: "",
    portable: "",
    adresse: "",
    codepostal: "",
    ville: "",
    pays: "",
    setClient: (account) =>
        set((state) => ({
            ...state,
            id: account.id,
            nom: account.nom,
            email: account.email,
            tel: account.tel,
            portable: account.portable,
            adresse: account.adresse,
            codepostal: account.codepostal,
            ville: account.ville,
            pays: account.pays,
        })),
    setEmail: (email) => set((state) => ({
        ...state,
        email,
    })),
    resetClient: () =>
        set(() => ({
            id: 0,
            nom: "",
            email: "",
            tel: "",
            portable: "",
            adresse: "",
            codepostal: "",
            ville: "",
            pays: "",
        })),
}));
