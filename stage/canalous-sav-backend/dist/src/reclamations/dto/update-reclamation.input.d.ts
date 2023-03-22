import { CreateReclamationInput } from "./create-reclamation.input";
declare const UpdateReclamationInput_base: import("@nestjs/common").Type<Partial<CreateReclamationInput>>;
export declare class UpdateReclamationInput extends UpdateReclamationInput_base {
    id: number;
    statut?: string;
    geste?: string;
}
export {};
