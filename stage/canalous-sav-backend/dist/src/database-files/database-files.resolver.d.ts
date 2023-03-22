import { DatabaseFilesService } from "./database-files.service";
import { FileUpload } from "graphql-upload";
import DatabaseFile from "./entities/databaseFile.entity";
import { NotificationsService } from "src/notifications/notifications.service";
import { LogsService } from "src/logs/logs.service";
import { PubSubEngine } from "graphql-subscriptions";
export declare class DatabaseFilesResolver {
    private readonly databaseFilesService;
    private readonly notificationsService;
    private readonly logsService;
    private pubSub;
    constructor(databaseFilesService: DatabaseFilesService, notificationsService: NotificationsService, logsService: LogsService, pubSub: PubSubEngine);
    uploadFile(reclamationId: number, file: FileUpload): Promise<boolean>;
    findAll(): Promise<DatabaseFile[]>;
}
