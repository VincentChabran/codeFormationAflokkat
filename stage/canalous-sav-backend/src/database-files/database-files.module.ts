import { Module } from "@nestjs/common";
import { DatabaseFilesService } from "./database-files.service";
import { DatabaseFilesResolver } from "./database-files.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseFile from "./entities/databaseFile.entity";
import { NotificationsModule } from "src/notifications/notifications.module";
import { LogsModule } from "src/logs/logs.module";
import { PubSubModule } from "src/pub-sub/pub-sub.module";

@Module({
    imports: [TypeOrmModule.forFeature([DatabaseFile]), NotificationsModule, LogsModule, PubSubModule],
    providers: [DatabaseFilesResolver, DatabaseFilesService],
    exports: [DatabaseFilesService],
})
export class DatabaseFilesModule {}
