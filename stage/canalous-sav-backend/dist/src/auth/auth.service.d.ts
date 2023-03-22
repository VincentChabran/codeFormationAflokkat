import { UtilisateursService } from "src/utilisateurs/utilisateurs.service";
import { LoginUserInput } from "./dto/login-input";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import { SignupUserInput } from "./dto/signup-input";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "src/mail/mail.service";
export declare class AuthService {
    private utilisateursService;
    private jwtService;
    private mailService;
    constructor(utilisateursService: UtilisateursService, jwtService: JwtService, mailService: MailService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginUserInput: LoginUserInput): Promise<{
        access_token: string;
        utilisateur: Utilisateur;
    }>;
    signup(signupUserInput: SignupUserInput): Promise<Utilisateur>;
}
