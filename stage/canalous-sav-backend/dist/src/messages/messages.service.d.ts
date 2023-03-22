import { DeleteResult, Repository } from "typeorm";
import { CreateMessageInput } from "./dto/create-message.input";
import { UpdateMessageInput } from "./dto/update-message.input";
import { Message } from "./entities/message.entity";
export declare class MessagesService {
    private messagesRepository;
    constructor(messagesRepository: Repository<Message>);
    create(createMessageInput: CreateMessageInput): Promise<Message>;
    findAll(): Promise<Message[]>;
    findOne(id: number): Promise<Message | null>;
    update(id: number, updateMessageInput: UpdateMessageInput): Promise<Message | null>;
    remove(id: number): Promise<DeleteResult>;
}
