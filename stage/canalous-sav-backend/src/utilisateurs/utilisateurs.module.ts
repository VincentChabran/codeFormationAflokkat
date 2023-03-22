import { Module } from "@nestjs/common";
import { UtilisateursService } from "./utilisateurs.service";
import { UtilisateursResolver } from "./utilisateurs.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Utilisateur } from "./entities/utilisateur.entity";
import { NotificationsModule } from "src/notifications/notifications.module";
import { JwtModule } from "@nestjs/jwt";
import { PubSubModule } from "src/pub-sub/pub-sub.module";

@Module({
   imports: [
      TypeOrmModule.forFeature([Utilisateur]),
      NotificationsModule,
      JwtModule.register({
         signOptions: { expiresIn: "60s" },
         secret: "hide-me",
      }),
      PubSubModule,
   ],
   providers: [UtilisateursResolver, UtilisateursService],
   exports: [UtilisateursService],
})
export class UtilisateursModule {}
