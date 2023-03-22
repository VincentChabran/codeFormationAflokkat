import { ClientsService } from "./clients.service";
import { Client } from "./entities/client.entity";
import { CreateClientInput } from "./dto/create-client.input";
import { UpdateClientInput } from "./dto/update-client.input";
export declare class ClientsResolver {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    createClient(createClientInput: CreateClientInput): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client>;
    updateClient(updateClientInput: UpdateClientInput): Promise<Client>;
    removeClient(id: number): Promise<import("typeorm").DeleteResult>;
}
