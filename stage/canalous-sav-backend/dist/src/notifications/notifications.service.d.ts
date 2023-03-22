import { DeleteResult, Repository } from "typeorm";
import { CreateNotificationInput } from "./dto/create-notification.input";
import { UpdateNotificationInput } from "./dto/update-notification.input";
import { Notification } from "./entities/notification.entity";
export declare class NotificationsService {
    private notificationsRepository;
    constructor(notificationsRepository: Repository<Notification>);
    create(createNotificationInput: CreateNotificationInput): Promise<Notification>;
    findAll(): Promise<Notification[]>;
    findOne(id: number): Promise<Notification | null>;
    getNotificationsById(id: number): Promise<Notification[]>;
    update(id: number, updateNotificationInput: UpdateNotificationInput): Promise<Notification | null>;
    remove(id: number): Promise<DeleteResult>;
}
