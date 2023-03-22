import { CreatePropositionInput } from "./create-proposition.input";
declare const UpdatePropositionInput_base: import("@nestjs/common").Type<Partial<CreatePropositionInput>>;
export declare class UpdatePropositionInput extends UpdatePropositionInput_base {
    id: number;
    statut: string;
    commentaire: string;
}
export {};
