import { Reclamation } from "src/reclamations/entities/reclamation.entity";
declare class DatabaseFile {
    id: number;
    filename: string;
    reclamationId: number;
    reclamation: Promise<Reclamation>;
}
export default DatabaseFile;
