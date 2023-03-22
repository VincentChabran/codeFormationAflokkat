"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReclamationsModule = void 0;
const common_1 = require("@nestjs/common");
const reclamations_service_1 = require("./reclamations.service");
const reclamations_resolver_1 = require("./reclamations.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const reclamation_entity_1 = require("./entities/reclamation.entity");
const notifications_module_1 = require("../notifications/notifications.module");
const pub_sub_module_1 = require("../pub-sub/pub-sub.module");
const logs_module_1 = require("../logs/logs.module");
const utilisateurs_module_1 = require("../utilisateurs/utilisateurs.module");
const bases_module_1 = require("../bases/bases.module");
const questionnaires_module_1 = require("../questionnaires/questionnaires.module");
const mailer_1 = require("@nestjs-modules/mailer");
const mail_module_1 = require("../mail/mail.module");
const database_files_module_1 = require("../database-files/database-files.module");
const reservations_module_1 = require("../reservations/reservations.module");
const mail_templates_module_1 = require("../mail-templates/mail-templates.module");
let ReclamationsModule = class ReclamationsModule {
};
ReclamationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([reclamation_entity_1.Reclamation]),
            utilisateurs_module_1.UtilisateursModule,
            bases_module_1.BasesModule,
            reservations_module_1.ReservationsModule,
            questionnaires_module_1.QuestionnairesModule,
            database_files_module_1.DatabaseFilesModule,
            notifications_module_1.NotificationsModule,
            logs_module_1.LogsModule,
            pub_sub_module_1.PubSubModule,
            mailer_1.MailerModule,
            mail_module_1.MailModule,
            mail_templates_module_1.MailTemplatesModule,
        ],
        providers: [reclamations_resolver_1.ReclamationsResolver, reclamations_service_1.ReclamationsService],
    })
], ReclamationsModule);
exports.ReclamationsModule = ReclamationsModule;
//# sourceMappingURL=reclamations.module.js.map