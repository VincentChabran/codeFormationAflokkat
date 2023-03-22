import create from "zustand";

interface PanelsInput {
    isReclamationOpen: boolean;
    isMessagerieOpen: boolean;
    isRapportOpen: boolean;
    isNewRapportOpen: boolean;
    isMailOpen: boolean;
    isPropositionsOpen: boolean;
    isAttachmentsOpen: boolean;
    isLogsOpen: boolean;
}

interface ApplicationState {
    panelsState: {
        isReclamationOpen: boolean;
        isMessagerieOpen: boolean;
        isRapportOpen: boolean;
        isNewRapportOpen: boolean;
        isMailOpen: boolean;
        isPropositionsOpen: boolean;
        isAttachmentsOpen: boolean;
        isLogsOpen: boolean;
    };
    searchClient: string;
    selectiveDisplay: string[];
    searchClientForQuestionnaire: string;
    selectiveDisplayForQuestionnaire: string[];
    setPanelsState: (panelsInput: PanelsInput) => void;
    openOrCloseReclamation: (open?: boolean) => void;
    openMessagerie: () => void;
    openRapport: () => void;
    openOrCloseNewRapport: () => void;
    openMail: () => void;
    openPropositions: () => void;
    openAttachments: () => void;
    openLogs: () => void;
    setSearchClient: (searchClient: string) => void;
    setSelectiveDisplay: (selectiveDisplay: string[]) => void;
    setSearchClientForQuestionnaire: (searchClientForQuestionnaire: string) => void;
    setSelectiveDisplayForQuestionnaire: (selectiveDisplayForQuestionnaire: string[]) => void;
    displayInitials: () => void;
    displaySpecificStatut: (statut: string) => void;
}

const initialDisplay = [
    "Nouvellement créée",
    "Constitution du dossier",
    "Proposition du geste commercial",
    "Geste commercial validé",
    "Proposition au client",
    "Retour client",
];

const initialQuestionnaireDisplay = ["Non consulté", "Consulté", "Bon", "Moyen", "Réclamation"];

export const useApplicationStore = create<ApplicationState>((set) => ({
    panelsState: {
        isReclamationOpen: true,
        isMessagerieOpen: false,
        isRapportOpen: false,
        isNewRapportOpen: false,
        isMailOpen: false,
        isPropositionsOpen: false,
        isAttachmentsOpen: false,
        isLogsOpen: false,
    },
    searchClient: "",
    selectiveDisplay: initialDisplay,
    searchClientForQuestionnaire: "",
    selectiveDisplayForQuestionnaire: initialQuestionnaireDisplay,
    setPanelsState: ({
        isReclamationOpen,
        isMessagerieOpen,
        isRapportOpen,
        isNewRapportOpen,
        isMailOpen,
        isPropositionsOpen,
        isAttachmentsOpen,
        isLogsOpen,
    }) =>
        set((state) => ({
            ...state,
            panelsState: {
                isReclamationOpen,
                isMessagerieOpen,
                isRapportOpen,
                isNewRapportOpen,
                isMailOpen,
                isPropositionsOpen,
                isAttachmentsOpen,
                isLogsOpen,
            },
        })),
    openOrCloseReclamation: (open) =>
        set((state) => ({
            ...state,
            panelsState: {
                isReclamationOpen: open || !state.panelsState.isReclamationOpen,
                isMessagerieOpen: !open || state.panelsState.isReclamationOpen ? true : false,
                isRapportOpen: false,
                isNewRapportOpen: false,
                isMailOpen: false,
                isPropositionsOpen: false,
                isAttachmentsOpen: false,
                isLogsOpen: false,
            },
        })),
    openMessagerie: () =>
        set((state) => ({
            ...state,
            panelsState: {
                isReclamationOpen: false,
                isMessagerieOpen: true,
                isRapportOpen: false,
                isNewRapportOpen: false,
                isMailOpen: false,
                isPropositionsOpen: false,
                isAttachmentsOpen: false,
                isLogsOpen: false,
            },
        })),
    openRapport: () =>
        set((state) => ({
            ...state,
            panelsState: {
                isReclamationOpen: false,
                isMessagerieOpen: false,
                isRapportOpen: true,
                isNewRapportOpen: false,
                isMailOpen: false,
                isPropositionsOpen: false,
                isAttachmentsOpen: false,
                isLogsOpen: false,
            },
        })),
    openOrCloseNewRapport: () =>
        set((state) => ({
            ...state,
            panelsState: {
                isReclamationOpen: false,
                isMessagerieOpen: state.panelsState.isNewRapportOpen ? true : false,
                isRapportOpen: false,
                isNewRapportOpen: !state.panelsState.isNewRapportOpen,
                isMailOpen: false,
                isPropositionsOpen: false,
                isAttachmentsOpen: false,
                isLogsOpen: false,
            },
        })),
    openMail: () =>
        set((state) => ({
            ...state,
            panelsState: {
                isReclamationOpen: false,
                isMessagerieOpen: false,
                isRapportOpen: false,
                isNewRapportOpen: false,
                isMailOpen: true,
                isPropositionsOpen: false,
                isAttachmentsOpen: false,
                isLogsOpen: false,
            },
        })),
    openPropositions: () =>
        set((state) => ({
            ...state,
            panelsState: {
                isReclamationOpen: false,
                isMessagerieOpen: false,
                isRapportOpen: false,
                isNewRapportOpen: false,
                isMailOpen: false,
                isPropositionsOpen: true,
                isAttachmentsOpen: false,
                isLogsOpen: false,
            },
        })),
    openAttachments: () =>
        set((state) => ({
            ...state,
            panelsState: {
                isReclamationOpen: false,
                isMessagerieOpen: false,
                isRapportOpen: false,
                isNewRapportOpen: false,
                isMailOpen: false,
                isPropositionsOpen: false,
                isAttachmentsOpen: true,
                isLogsOpen: false,
            },
        })),
    openLogs: () =>
        set((state) => ({
            ...state,
            panelsState: {
                isReclamationOpen: false,
                isMessagerieOpen: false,
                isRapportOpen: false,
                isNewRapportOpen: false,
                isMailOpen: false,
                isPropositionsOpen: false,
                isAttachmentsOpen: false,
                isLogsOpen: true,
            },
        })),
    setSearchClient: (searchClient) =>
        set((state) => ({
            ...state,
            searchClient,
        })),
    setSelectiveDisplay: (selectiveDisplay) =>
        set((state) => ({
            ...state,
            selectiveDisplay,
        })),
    setSearchClientForQuestionnaire: (searchClientForQuestionnaire) =>
        set((state) => ({
            ...state,
            searchClientForQuestionnaire,
        })),
    setSelectiveDisplayForQuestionnaire: (selectiveDisplayForQuestionnaire) =>
        set((state) => ({
            ...state,
            selectiveDisplayForQuestionnaire,
        })),
    displayInitials: () =>
        set((state) => ({
            ...state,
            selectiveDisplay: initialDisplay,
            selectiveDisplayForQuestionnaire: initialQuestionnaireDisplay,
        })),
    displaySpecificStatut: (statut) =>
        set((state) => ({
            ...state,
            selectiveDisplay: [statut],
        })),
}));
