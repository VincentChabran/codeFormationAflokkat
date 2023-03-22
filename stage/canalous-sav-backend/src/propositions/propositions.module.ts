import { Module } from "@nestjs/common";
import { PropositionsService } from "./propositions.service";
import { PropositionsResolver } from "./propositions.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Proposition } from "./entities/proposition.entity";
import { LogsModule } from "src/logs/logs.module";
import { NotificationsModule } from "src/notifications/notifications.module";
import { PubSubModule } from "src/pub-sub/pub-sub.module";

@Module({
    imports: [TypeOrmModule.forFeature([Proposition]), NotificationsModule, LogsModule, PubSubModule],
    providers: [PropositionsResolver, PropositionsService],
})
export class PropositionsModule {}
