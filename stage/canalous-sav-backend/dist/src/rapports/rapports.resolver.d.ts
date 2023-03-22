import { RapportsService } from "./rapports.service";
import { Rapport } from "./entities/rapport.entity";
import { CreateRapportInput } from "./dto/create-rapport.input";
import { UpdateRapportInput } from "./dto/update-rapport.input";
import { PubSubEngine } from "graphql-subscriptions";
import { NotificationsService } from "src/notifications/notifications.service";
import { LogsService } from "src/logs/logs.service";
export declare class RapportsResolver {
    private readonly rapportsService;
    private readonly notificationsService;
    private readonly logsService;
    private pubSub;
    constructor(rapportsService: RapportsService, notificationsService: NotificationsService, logsService: LogsService, pubSub: PubSubEngine);
    createRapport(createRapportInput: CreateRapportInput): Promise<Rapport>;
    findAll(): Promise<Rapport[]>;
    findOne(id: number): Promise<Rapport>;
    updateRapport(updateRapportInput: UpdateRapportInput): Promise<Rapport>;
    removeRapport(id: number): Promise<import("typeorm").DeleteResult>;
}
