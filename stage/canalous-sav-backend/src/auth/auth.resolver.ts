import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import { IgnoreJwtGuard } from "../utils/ignoreJwtGuard-decorateur";
import { AuthService } from "./auth.service";
import { LoginUserInput } from "./dto/login-input";
import { LoginResponse } from "./dto/login-response";
import { SignupUserInput } from "./dto/signup-input";
import { GqlAuthGuard } from "./gql-auth.guard";

@Resolver()
export class AuthResolver {
   constructor(private authService: AuthService) {}

   @IgnoreJwtGuard()
   @UseGuards(GqlAuthGuard)
   @Mutation(() => LoginResponse)
   async login(@Args("loginUserInput") loginUserInput: LoginUserInput) {
      const result = await this.authService.login(loginUserInput);
      return result;
   }

   @IgnoreJwtGuard()
   @Mutation(() => Utilisateur, { name: "SignUp" })
   signup(@Args("signupUserInput") signupUserInput: SignupUserInput) {
      return this.authService.signup(signupUserInput);
   }
}
