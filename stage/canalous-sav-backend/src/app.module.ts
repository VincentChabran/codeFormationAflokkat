import { Module } from "@nestjs/common";
import { GqlExecutionContext, GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UtilisateursModule } from "./utilisateurs/utilisateurs.module";
import { RapportsModule } from "./rapports/rapports.module";
import { ReclamationsModule } from "./reclamations/reclamations.module";
import { ClientsModule } from "./clients/clients.module";
import { MessagesModule } from "./messages/messages.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PubSubModule } from "./pub-sub/pub-sub.module";
import { MailModule } from "./mail/mail.module";
import { PropositionsModule } from "./propositions/propositions.module";
import { LogsModule } from "./logs/logs.module";
import { BasesModule } from "./bases/bases.module";
import { QuestionnairesModule } from "./questionnaires/questionnaires.module";
import { DatabaseFilesModule } from "./database-files/database-files.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { MailTemplatesModule } from "./mail-templates/mail-templates.module";
import config from "ormconfig";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      GraphQLModule.forRoot({
         autoSchemaFile: join(process.cwd(), "src/schema.gql"),
         playground: false,
         plugins: [ApolloServerPluginLandingPageLocalDefault()],
         subscriptions: {
            "graphql-ws": true,
            "subscriptions-transport-ws": true,
         },
         context: (ctx: GqlExecutionContext) => ctx,
         cors: {
            credentials: true,
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            allowedHeaders: "Content-Type,Accept,Authorization,Access-Control-Allow-Origin",
         },
      }),
      TypeOrmModule.forRoot(config),
      UtilisateursModule,
      RapportsModule,
      ReclamationsModule,
      ClientsModule,
      MessagesModule,
      NotificationsModule,
      AuthModule,
      PubSubModule,
      MailModule,
      PropositionsModule,
      LogsModule,
      BasesModule,
      QuestionnairesModule,
      DatabaseFilesModule,
      ReservationsModule,
      MailTemplatesModule,
   ],
   controllers: [AppController],
   providers: [
      AppService,
      // Dit que le garde JWT est global
      {
         provide: APP_GUARD,
         useClass: JwtAuthGuard,
      },
   ],
})
export class AppModule {}
