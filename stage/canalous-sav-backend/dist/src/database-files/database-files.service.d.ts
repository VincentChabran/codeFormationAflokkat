import { Repository } from "typeorm";
import { CreateDatabaseFileInput } from "./dto/create-databaseFile.input";
import DatabaseFile from "./entities/databaseFile.entity";
export declare class DatabaseFilesService {
    private databaseFilesRepository;
    constructor(databaseFilesRepository: Repository<DatabaseFile>);
    create(createDatabaseFile: CreateDatabaseFileInput): Promise<DatabaseFile>;
    findAll(): Promise<DatabaseFile[]>;
    findOne(id: number): Promise<DatabaseFile>;
    getFileById(id: number): Promise<DatabaseFile>;
}
