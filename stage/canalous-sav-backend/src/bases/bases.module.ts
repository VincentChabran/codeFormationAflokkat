import { Module } from "@nestjs/common";
import { BasesService } from "./bases.service";
import { BasesResolver } from "./bases.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Base } from "./entities/base.entity";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "src/auth/auth.module";
import { UtilisateursModule } from "src/utilisateurs/utilisateurs.module";

@Module({
    imports: [TypeOrmModule.forFeature([Base]), HttpModule, AuthModule, UtilisateursModule],
    providers: [BasesResolver, BasesService],
    exports: [BasesService],
})
export class BasesModule {}
