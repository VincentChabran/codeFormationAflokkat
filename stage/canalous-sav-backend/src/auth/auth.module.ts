import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailModule } from "src/mail/mail.module";
import { UtilisateursModule } from "src/utilisateurs/utilisateurs.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import * as dotenv from "dotenv";
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
        UtilisateursModule,
        MailModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "24h" },
        }),
        // JwtModule.registerAsync({
        //   inject: [ConfigService],
        //   useFactory: async (config: ConfigService) => ({
        //     signOptions: { expiresIn: "60s" },
        //     secret: config.get("JWT_SECRET"),
        //   }),
        // }),
    ],
    providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
