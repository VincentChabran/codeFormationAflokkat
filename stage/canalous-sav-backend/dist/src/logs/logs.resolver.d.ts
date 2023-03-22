import { LogsService } from "./logs.service";
import { Log } from "./entities/log.entity";
import { CreateLogInput } from "./dto/create-log.input";
export declare class LogsResolver {
    private readonly logService;
    constructor(logService: LogsService);
    createLog(createLogInput: CreateLogInput): Promise<Log>;
    findAll(): Promise<Log[]>;
    findOne(id: number): Promise<Log>;
}
