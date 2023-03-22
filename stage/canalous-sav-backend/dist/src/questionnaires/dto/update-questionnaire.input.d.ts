import { CreateQuestionnaireInput } from "./create-questionnaire.input";
declare const UpdateQuestionnaireInput_base: import("@nestjs/common").Type<Partial<CreateQuestionnaireInput>>;
export declare class UpdateQuestionnaireInput extends UpdateQuestionnaireInput_base {
    id: number;
    statut: string;
}
export {};
