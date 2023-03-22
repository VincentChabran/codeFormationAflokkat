"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const path_1 = require("path");
const mail_service_1 = require("./mail.service");
const mail_resolver_1 = require("./mail.resolver");
const logs_module_1 = require("../logs/logs.module");
const mail_templates_module_1 = require("../mail-templates/mail-templates.module");
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mail_templates_module_1.MailTemplatesModule,
            logs_module_1.LogsModule,
            jwt_1.JwtModule.register({
                signOptions: { expiresIn: "60s" },
                secret: "also-hide-me",
            }),
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
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
                        dir: (0, path_1.join)(__dirname, "../../mail/templates"),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
        ],
        providers: [mail_service_1.MailService, mail_resolver_1.MailResolver],
        exports: [mail_service_1.MailService],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map