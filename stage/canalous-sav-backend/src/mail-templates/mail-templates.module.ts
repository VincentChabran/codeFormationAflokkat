import { Module } from "@nestjs/common";
import { MailTemplatesService } from "./mail-templates.service";
import { MailTemplatesResolver } from "./mail-templates.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailTemplate } from "./entities/mail-template.entity";

@Module({
    imports: [TypeOrmModule.forFeature([MailTemplate])],
    providers: [MailTemplatesResolver, MailTemplatesService],
    exports: [MailTemplatesService],
})
export class MailTemplatesModule {}
