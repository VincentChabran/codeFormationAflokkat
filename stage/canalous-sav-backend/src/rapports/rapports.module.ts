import { Module } from "@nestjs/common";
import { RapportsService } from "./rapports.service";
import { RapportsResolver } from "./rapports.resolver";
import { Rapport } from "./entities/rapport.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsModule } from "src/notifications/notifications.module";
import { PubSubModule } from "src/pub-sub/pub-sub.module";
import { LogsModule } from "src/logs/logs.module";

@Module({
    imports: [TypeOrmModule.forFeature([Rapport]), NotificationsModule, LogsModule, PubSubModule],
    providers: [RapportsResolver, RapportsService],
})
export class RapportsModule {}
