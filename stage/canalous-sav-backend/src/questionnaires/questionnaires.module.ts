import { Module } from "@nestjs/common";
import { QuestionnairesService } from "./questionnaires.service";
import { QuestionnairesResolver } from "./questionnaires.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Questionnaire } from "./entities/questionnaire.entity";
import { HttpModule } from "@nestjs/axios";
import { ReservationsModule } from "src/reservations/reservations.module";

@Module({
    imports: [TypeOrmModule.forFeature([Questionnaire]), HttpModule, ReservationsModule],
    providers: [QuestionnairesResolver, QuestionnairesService],
    exports: [QuestionnairesService],
})
export class QuestionnairesModule {}
