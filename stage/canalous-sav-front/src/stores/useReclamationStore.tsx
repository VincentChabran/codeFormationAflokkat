import create from "zustand";

interface ReclamationInput {
   id: number;
   reclamation: string;
   responsableId: number;
   clientId: number;
}
interface ReclamationState {
   id: number;
   reclamation: string;
   responsableId: number;
   clientId: number;
   statut: string;
   geste: {
      type: string;
      value: string;
   };
   changeQuestionnaireToReclamation: boolean;
   setReclamation: (reclamation: ReclamationInput) => void;
   setStatut: (statut: string) => void;
   setGeste: (type: string, value: string) => void;
   setChangeQuestionnaireToReclamation: () => void;
}

export const useReclamationStore = create<ReclamationState>((set) => ({
   id: 0,
   reclamation: "",
   responsableId: 0,
   clientId: 0,
   statut: "Nouvellement créée",
   geste: {
      type: "",
      value: "",
   },
   changeQuestionnaireToReclamation: false,
   setReclamation: (reclamation) =>
      set((state) => ({
         ...state,
         id: reclamation.id,
         reclamation: reclamation.reclamation,
         responsableId: reclamation.responsableId,
         clientId: reclamation.clientId,
      })),
   setStatut: (statut) =>
      set((state) => ({
         ...state,
         statut,
      })),
   setGeste: (type, value) =>
      set((state) => ({
         ...state,
         geste: { type, value },
      })),
   setChangeQuestionnaireToReclamation: () =>
      set((state) => ({
         ...state,
         changeQuestionnaireToReclamation: !state.changeQuestionnaireToReclamation,
      })),
}));
