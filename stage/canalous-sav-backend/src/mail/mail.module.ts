import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { join } from "path";
import { MailService } from "./mail.service";
import { MailResolver } from "./mail.resolver";
import { LogsModule } from "src/logs/logs.module";
import { MailTemplatesModule } from "src/mail-templates/mail-templates.module";

@Global()
@Module({
    imports: [
        MailTemplatesModule,
        LogsModule,
        JwtModule.register({
            signOptions: { expiresIn: "60s" },
            secret: "also-hide-me",
        }),
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                transport: {
                    pool: true,
                    host: config.get("MAIL_HOST"),
                    port: 465,
                    secure: true,
                    auth: {
                        user: config.get("MAIL_USER"),
                        pass: config.get("MAIL_PASSWORD"),
                    },
                },
                defaults: {
                    from: `<${config.get("MAIL_FROM")}>`,
                },
                preview: false,
                template: {
                    dir: join(__dirname, "../../mail/templates"),
                    // dir: "dist/templates",
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],
    providers: [MailService, MailResolver],
    exports: [MailService],
})
export class MailModule {}
