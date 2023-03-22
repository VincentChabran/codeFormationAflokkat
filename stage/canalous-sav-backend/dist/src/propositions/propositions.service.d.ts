import { DeleteResult, Repository } from "typeorm";
import { CreatePropositionInput } from "./dto/create-proposition.input";
import { UpdatePropositionInput } from "./dto/update-proposition.input";
import { Proposition } from "./entities/proposition.entity";
export declare class PropositionsService {
    private propositionsRepository;
    constructor(propositionsRepository: Repository<Proposition>);
    create(createPropositionInput: CreatePropositionInput): Promise<Proposition>;
    findAll(): Promise<Proposition[]>;
    findOne(id: number): Promise<Proposition | null>;
    update(id: number, updatePropositionInput: UpdatePropositionInput): Promise<Proposition | null>;
    remove(id: number): Promise<DeleteResult>;
}
