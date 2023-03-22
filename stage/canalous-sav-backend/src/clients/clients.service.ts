import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateClientInput } from "./dto/create-client.input";
import { UpdateClientInput } from "./dto/update-client.input";
import { Client } from "./entities/client.entity";

@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Client) private clientsRepository: Repository<Client>) {}

    async create(createClientInput: CreateClientInput): Promise<Client> {
        const newClient = this.clientsRepository.create(createClientInput);
        return await this.clientsRepository.save(newClient);
    }

    async findAll(): Promise<Client[]> {
        return await this.clientsRepository.find();
    }

    async findOne(id: number): Promise<Client | null> {
        return await this.clientsRepository.findOneOrFail(id);
    }

    async update(id: number, updateClientInput: UpdateClientInput): Promise<Client | null> {
        await this.clientsRepository.findOneOrFail(id);
        await this.clientsRepository.update(id, updateClientInput);
        return await this.clientsRepository.findOne(id);
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.clientsRepository.delete(id);
    }
}
