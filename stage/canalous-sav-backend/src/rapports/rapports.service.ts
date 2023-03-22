import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateRapportInput } from "./dto/create-rapport.input";
import { UpdateRapportInput } from "./dto/update-rapport.input";
import { Rapport } from "./entities/rapport.entity";

@Injectable()
export class RapportsService {
    constructor(@InjectRepository(Rapport) private rapportsRepository: Repository<Rapport>) {}

    async create(createRapportInput: CreateRapportInput): Promise<Rapport> {
        const newRapport = this.rapportsRepository.create(createRapportInput);
        return this.rapportsRepository.save(newRapport);
    }

    async findAll(): Promise<Rapport[]> {
        return await this.rapportsRepository.find();
    }

    async findOne(id: number): Promise<Rapport | null> {
        return this.rapportsRepository.findOneOrFail(id);
    }

    async update(id: number, updateRapportInput: UpdateRapportInput): Promise<Rapport | null> {
        await this.rapportsRepository.findOneOrFail(id);
        await this.rapportsRepository.update(id, updateRapportInput);
        return await this.rapportsRepository.findOne(id);
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.rapportsRepository.delete(id);
    }

    async newRapportCreated() {
        return "Rapport créé !";
    }
}
