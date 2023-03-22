import { Injectable } from "@nestjs/common";
import { UtilisateursService } from "src/utilisateurs/utilisateurs.service";
import { compare, hash } from "bcrypt";
import { LoginUserInput } from "./dto/login-input";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import { SignupUserInput } from "./dto/signup-input";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "src/mail/mail.service";
import { ChangePasswordInput } from "./dto/change-password";

@Injectable()
export class AuthService {
   constructor(
      private utilisateursService: UtilisateursService,
      private jwtService: JwtService,
      private mailService: MailService
   ) {}

   async validateUser(email: string, password: string): Promise<any> {
      const utilisateur = await this.utilisateursService.findOne(email);

      const estValide = await compare(password, utilisateur?.password);

      if (utilisateur && estValide) {
         const { password, ...result } = utilisateur;
         return result;
      }
      return null;
   }

   async login(loginUserInput: LoginUserInput) {
      const utilisateur = await this.utilisateursService.findOne(loginUserInput.email);
      return {
         access_token: this.jwtService.sign({
            id: utilisateur.id,
            nom: utilisateur.nom,
            email: utilisateur.email,
            role: utilisateur.role,
         }),
         utilisateur,
      };
   }

   async signup(signupUserInput: SignupUserInput): Promise<Utilisateur> {
      const user = await this.utilisateursService.findOne(signupUserInput.email);

      if (user) {
         throw new Error("Cet utilisateur existe déjà.");
      }

      const password = await hash(signupUserInput.password, 10);

      const newUser = this.utilisateursService.create({
         ...signupUserInput,
         password,
      });

      return newUser;
   }
}
