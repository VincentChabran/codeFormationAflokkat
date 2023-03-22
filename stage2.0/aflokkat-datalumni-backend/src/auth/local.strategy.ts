import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: AuthService) {
      super({ usernameField: 'email' });
   }

   async validate(email: string, password: string): Promise<any> {
      const user = await this.authService.validateUser(email, password);

      if (user === "Le compte n'est pas encore activé") {
         throw new UnauthorizedException("Votre compte n'est pas encore activé");
      } else if (!user) {
         throw new UnauthorizedException();
      }
      return user;
   }
}
