import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsResolver } from "./notifications.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { PubSubModule } from "src/pub-sub/pub-sub.module";
import { LogsModule } from "src/logs/logs.module";

@Module({
    imports: [TypeOrmModule.forFeature([Notification]), LogsModule, PubSubModule],
    providers: [NotificationsResolver, NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule {}
