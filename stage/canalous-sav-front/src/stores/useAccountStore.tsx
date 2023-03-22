import create from "zustand";

interface AccountInput {
    id: number;
    nom: string;
    email: string;
    role: string;
}
interface AccountState {
    id: number;
    nom: string;
    email: string;
    role: string;
    setAccount: (account: AccountInput) => void;
    switchRole: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
    id: 0,
    nom: "Initial name",
    email: "initial@email.com",
    role: "commercial",
    setAccount: (account) =>
        set((state) => ({
            ...state,
            id: account.id,
            nom: account.nom,
            email: account.email,
            role: account.role,
        })),
    switchRole: () =>
        set((state) => ({
            ...state,
            role: state.role === "direction" ? "base" : "direction",
        })),
}));
