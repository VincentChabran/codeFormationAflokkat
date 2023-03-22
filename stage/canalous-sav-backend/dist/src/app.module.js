"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const apollo_server_core_1 = require("apollo-server-core");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const utilisateurs_module_1 = require("./utilisateurs/utilisateurs.module");
const rapports_module_1 = require("./rapports/rapports.module");
const reclamations_module_1 = require("./reclamations/reclamations.module");
const clients_module_1 = require("./clients/clients.module");
const messages_module_1 = require("./messages/messages.module");
const notifications_module_1 = require("./notifications/notifications.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const pub_sub_module_1 = require("./pub-sub/pub-sub.module");
const mail_module_1 = require("./mail/mail.module");
const propositions_module_1 = require("./propositions/propositions.module");
const logs_module_1 = require("./logs/logs.module");
const bases_module_1 = require("./bases/bases.module");
const questionnaires_module_1 = require("./questionnaires/questionnaires.module");
const database_files_module_1 = require("./database-files/database-files.module");
const reservations_module_1 = require("./reservations/reservations.module");
const mail_templates_module_1 = require("./mail-templates/mail-templates.module");
const ormconfig_1 = require("../ormconfig");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), "src/schema.gql"),
                playground: false,
                plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)()],
                subscriptions: {
                    "graphql-ws": true,
                    "subscriptions-transport-ws": true,
                },
                context: (ctx) => ctx,
                cors: {
                    credentials: true,
                    origin: "*",
                    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
                    allowedHeaders: "Content-Type,Accept,Authorization,Access-Control-Allow-Origin",
                },
            }),
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.default),
            utilisateurs_module_1.UtilisateursModule,
            rapports_module_1.RapportsModule,
            reclamations_module_1.ReclamationsModule,
            clients_module_1.ClientsModule,
            messages_module_1.MessagesModule,
            notifications_module_1.NotificationsModule,
            auth_module_1.AuthModule,
            pub_sub_module_1.PubSubModule,
            mail_module_1.MailModule,
            propositions_module_1.PropositionsModule,
            logs_module_1.LogsModule,
            bases_module_1.BasesModule,
            questionnaires_module_1.QuestionnairesModule,
            database_files_module_1.DatabaseFilesModule,
            reservations_module_1.ReservationsModule,
            mail_templates_module_1.MailTemplatesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map