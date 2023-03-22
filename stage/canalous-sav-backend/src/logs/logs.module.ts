import { Module } from "@nestjs/common";
import { LogsService } from "./logs.service";
import { LogsResolver } from "./logs.resolver";
import { Log } from "./entities/log.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    providers: [LogsResolver, LogsService],
    exports: [LogsService],
})
export class LogsModule {}
