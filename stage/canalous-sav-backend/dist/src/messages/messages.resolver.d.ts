import { MessagesService } from "./messages.service";
import { Message } from "./entities/message.entity";
import { CreateMessageInput } from "./dto/create-message.input";
import { UpdateMessageInput } from "./dto/update-message.input";
import { PubSubEngine } from "graphql-subscriptions";
import { NotificationsService } from "src/notifications/notifications.service";
export declare class MessagesResolver {
    private readonly messagesService;
    private readonly notificationsService;
    private pubSub;
    constructor(messagesService: MessagesService, notificationsService: NotificationsService, pubSub: PubSubEngine);
    createMessage(createMessageInput: CreateMessageInput): Promise<Message>;
    findAll(): Promise<Message[]>;
    findOne(id: number): Promise<Message>;
    updateMessage(updateMessageInput: UpdateMessageInput): Promise<Message>;
    removeMessage(id: number): Promise<import("typeorm").DeleteResult>;
}
