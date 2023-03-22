import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDatabaseFileInput } from "./dto/create-databaseFile.input";
import DatabaseFile from "./entities/databaseFile.entity";

@Injectable()
export class DatabaseFilesService {
    constructor(
        @InjectRepository(DatabaseFile)
        private databaseFilesRepository: Repository<DatabaseFile>
    ) {}

    async create(createDatabaseFile: CreateDatabaseFileInput): Promise<DatabaseFile> {
        const newFile = this.databaseFilesRepository.create(createDatabaseFile);
        return await this.databaseFilesRepository.save(newFile);
    }

    async findAll(): Promise<DatabaseFile[]> {
        return await this.databaseFilesRepository.find();
    }

    async findOne(id: number): Promise<DatabaseFile> {
        return await this.databaseFilesRepository.findOne(id);
    }

    async getFileById(id: number) {
        const file = await this.databaseFilesRepository.findOne(id);
        if (!file) {
            throw new NotFoundException();
        }
        return file;
    }
}
