import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesResolver } from "./messages.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { NotificationsModule } from "src/notifications/notifications.module";
import { PubSubModule } from "src/pub-sub/pub-sub.module";

@Module({
    imports: [TypeOrmModule.forFeature([Message]), NotificationsModule, PubSubModule],
    providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
