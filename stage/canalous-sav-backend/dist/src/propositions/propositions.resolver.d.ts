import { PropositionsService } from "./propositions.service";
import { Proposition } from "./entities/proposition.entity";
import { CreatePropositionInput } from "./dto/create-proposition.input";
import { UpdatePropositionInput } from "./dto/update-proposition.input";
import { LogsService } from "src/logs/logs.service";
import { NotificationsService } from "src/notifications/notifications.service";
import { PubSubEngine } from "graphql-subscriptions";
export declare class PropositionsResolver {
    private readonly propositionsService;
    private readonly notificationsService;
    private readonly logsService;
    private pubSub;
    constructor(propositionsService: PropositionsService, notificationsService: NotificationsService, logsService: LogsService, pubSub: PubSubEngine);
    createProposition(createPropositionInput: CreatePropositionInput): Promise<Proposition>;
    findAll(): Promise<Proposition[]>;
    findOne(id: number): Promise<Proposition>;
    updateProposition(updatePropositionInput: UpdatePropositionInput): Promise<Proposition>;
    removeProposition(id: number): Promise<import("typeorm").DeleteResult>;
}
