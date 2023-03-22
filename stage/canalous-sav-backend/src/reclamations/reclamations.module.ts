import { Module } from "@nestjs/common";
import { ReclamationsService } from "./reclamations.service";
import { ReclamationsResolver } from "./reclamations.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reclamation } from "./entities/reclamation.entity";
import { NotificationsModule } from "src/notifications/notifications.module";
import { PubSubModule } from "src/pub-sub/pub-sub.module";
import { LogsModule } from "src/logs/logs.module";
import { UtilisateursModule } from "src/utilisateurs/utilisateurs.module";
import { BasesModule } from "src/bases/bases.module";
import { QuestionnairesModule } from "src/questionnaires/questionnaires.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailModule } from "src/mail/mail.module";
import { DatabaseFilesModule } from "src/database-files/database-files.module";
import { ReservationsModule } from "src/reservations/reservations.module";
import { MailTemplatesModule } from "src/mail-templates/mail-templates.module";

@Module({
   imports: [
      TypeOrmModule.forFeature([Reclamation]),
      UtilisateursModule,
      BasesModule,
      ReservationsModule,
      QuestionnairesModule,
      DatabaseFilesModule,
      NotificationsModule,
      LogsModule,
      PubSubModule,
      MailerModule,
      MailModule,
      MailTemplatesModule,
   ],
   providers: [ReclamationsResolver, ReclamationsService],
})
export class ReclamationsModule {}
