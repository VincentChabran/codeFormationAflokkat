import { NotificationsService } from "./notifications.service";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationInput } from "./dto/create-notification.input";
import { UpdateNotificationInput } from "./dto/update-notification.input";
import { PubSubEngine } from "graphql-subscriptions";
import { LogsService } from "src/logs/logs.service";
export declare class NotificationsResolver {
    private readonly notificationsService;
    private readonly logsService;
    private pubSub;
    constructor(notificationsService: NotificationsService, logsService: LogsService, pubSub: PubSubEngine);
    createNotification(createNotificationInput: CreateNotificationInput): Promise<CreateNotificationInput>;
    findAll(): Promise<Notification[]>;
    findOne(id: number): Promise<Notification>;
    getNotificationsById(id: number): Promise<Notification[]>;
    updateNotification(updateNotificationInput: UpdateNotificationInput): Promise<Notification>;
    removeNotification(id: number): Promise<import("typeorm").DeleteResult>;
}
