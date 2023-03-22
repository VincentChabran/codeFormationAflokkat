import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLogInput } from "./dto/create-log.input";
import { Log } from "./entities/log.entity";

@Injectable()
export class LogsService {
    constructor(@InjectRepository(Log) private logsRepository: Repository<Log>) {}

    async create(createLogInput: CreateLogInput): Promise<Log> {
        const newLog = this.logsRepository.create(createLogInput);
        return await this.logsRepository.save(newLog);
    }

    async findAll(): Promise<Log[]> {
        return await this.logsRepository.find();
    }

    async findOne(id: number): Promise<Log> {
        return await this.logsRepository.findOneOrFail(id);
    }
}
