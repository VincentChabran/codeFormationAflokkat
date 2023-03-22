import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreatePropositionInput } from "./dto/create-proposition.input";
import { UpdatePropositionInput } from "./dto/update-proposition.input";
import { Proposition } from "./entities/proposition.entity";

@Injectable()
export class PropositionsService {
    constructor(
        @InjectRepository(Proposition)
        private propositionsRepository: Repository<Proposition>
    ) {}

    async create(createPropositionInput: CreatePropositionInput): Promise<Proposition> {
        const newProposition = this.propositionsRepository.create(createPropositionInput);

        return await this.propositionsRepository.save(newProposition);
    }

    async findAll(): Promise<Proposition[]> {
        return await this.propositionsRepository.find();
    }

    async findOne(id: number): Promise<Proposition | null> {
        return this.propositionsRepository.findOneOrFail(id);
    }

    async update(id: number, updatePropositionInput: UpdatePropositionInput): Promise<Proposition | null> {
        await this.propositionsRepository.findOneOrFail(id);
        await this.propositionsRepository.update(id, updatePropositionInput);
        return await this.propositionsRepository.findOne(id);
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.propositionsRepository.delete(id);
    }
}
