import { CreateMailTemplateInput } from "./create-mail-template.input";
declare const UpdateMailTemplateInput_base: import("@nestjs/common").Type<Partial<CreateMailTemplateInput>>;
export declare class UpdateMailTemplateInput extends UpdateMailTemplateInput_base {
    id: number;
    nom?: string;
    fr?: string;
    en?: string;
    de?: string;
}
export {};
