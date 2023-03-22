import { Reclamation } from "src/reclamations/entities/reclamation.entity";
export declare class Log {
    id: number;
    log: string;
    reclamationId: number;
    reclamation: Promise<Reclamation>;
    createdAt: Date;
}
