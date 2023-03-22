import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateMessageInput } from "./dto/create-message.input";
import { UpdateMessageInput } from "./dto/update-message.input";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessagesService {
    constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>) {}

    async create(createMessageInput: CreateMessageInput): Promise<Message> {
        const newMessage = this.messagesRepository.create(createMessageInput);
        return await this.messagesRepository.save(newMessage);
    }

    async findAll(): Promise<Message[]> {
        return await this.messagesRepository.find();
    }

    async findOne(id: number): Promise<Message | null> {
        return await this.messagesRepository.findOneOrFail(id);
    }

    async update(id: number, updateMessageInput: UpdateMessageInput): Promise<Message | null> {
        await this.messagesRepository.findOneOrFail(id);
        await this.messagesRepository.update(id, updateMessageInput);
        return await this.messagesRepository.findOne(id);
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.messagesRepository.delete(id);
    }
}
