import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateBaseInput } from "./dto/create-base.input";
import { UpdateBaseInput } from "./dto/update-base.input";
import { Base } from "./entities/base.entity";

@Injectable()
export class BasesService {
    constructor(
        @InjectRepository(Base)
        private basesRepository: Repository<Base>
    ) {}

    async create(createBaseInput: CreateBaseInput): Promise<Base> {
        const newBase = this.basesRepository.create(createBaseInput);
        return await this.basesRepository.save(newBase);
    }

    async findAll(): Promise<Base[]> {
        return await this.basesRepository.find();
    }

    async findAllWithIds(ids: number[]): Promise<Base[]> {
        return await this.basesRepository.find({ where: { id: In(ids) } });
    }

    async findOne(id: number): Promise<Base | null> {
        return await this.basesRepository.findOneOrFail(id);
    }

    async update(id: number, updateBaseInput: UpdateBaseInput): Promise<Base | null> {
        const base = await this.basesRepository.findOneOrFail(id);
        const updatedBase = await this.basesRepository.update(id, updateBaseInput);
        return await this.basesRepository.findOne(id);
    }

    async remove(id: number) {
        return `This action removes a #${id} base`;
    }
}
