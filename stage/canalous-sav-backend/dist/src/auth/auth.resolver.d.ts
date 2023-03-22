import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import { AuthService } from "./auth.service";
import { LoginUserInput } from "./dto/login-input";
import { SignupUserInput } from "./dto/signup-input";
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(loginUserInput: LoginUserInput): Promise<{
        access_token: string;
        utilisateur: Utilisateur;
    }>;
    signup(signupUserInput: SignupUserInput): Promise<Utilisateur>;
}
