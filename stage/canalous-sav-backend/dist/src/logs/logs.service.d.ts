import { Repository } from "typeorm";
import { CreateLogInput } from "./dto/create-log.input";
import { Log } from "./entities/log.entity";
export declare class LogsService {
    private logsRepository;
    constructor(logsRepository: Repository<Log>);
    create(createLogInput: CreateLogInput): Promise<Log>;
    findAll(): Promise<Log[]>;
    findOne(id: number): Promise<Log>;
}
