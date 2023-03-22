import { DeleteResult, Repository } from "typeorm";
import { CreateClientInput } from "./dto/create-client.input";
import { UpdateClientInput } from "./dto/update-client.input";
import { Client } from "./entities/client.entity";
export declare class ClientsService {
    private clientsRepository;
    constructor(clientsRepository: Repository<Client>);
    create(createClientInput: CreateClientInput): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client | null>;
    update(id: number, updateClientInput: UpdateClientInput): Promise<Client | null>;
    remove(id: number): Promise<DeleteResult>;
}
