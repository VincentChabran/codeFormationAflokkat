import { DeleteResult, Repository } from "typeorm";
import { CreateRapportInput } from "./dto/create-rapport.input";
import { UpdateRapportInput } from "./dto/update-rapport.input";
import { Rapport } from "./entities/rapport.entity";
export declare class RapportsService {
    private rapportsRepository;
    constructor(rapportsRepository: Repository<Rapport>);
    create(createRapportInput: CreateRapportInput): Promise<Rapport>;
    findAll(): Promise<Rapport[]>;
    findOne(id: number): Promise<Rapport | null>;
    update(id: number, updateRapportInput: UpdateRapportInput): Promise<Rapport | null>;
    remove(id: number): Promise<DeleteResult>;
    newRapportCreated(): Promise<string>;
}
