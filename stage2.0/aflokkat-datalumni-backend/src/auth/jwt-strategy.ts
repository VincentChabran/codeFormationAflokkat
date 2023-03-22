import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/interface/JwtPayload';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: AuthService) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: true,
         secretOrKey: process.env.JWT_SECRET,
      });
   }

   async validate(payload: JwtPayload): Promise<JwtPayload> {
      return {
         id: payload.id,
         email: payload.email,
         nom: payload.nom,
         prenom: payload.prenom,
         profilPictureName: payload.profilPictureName,
         roles: payload.roles,
         mentor: payload.mentor,
      };
   }
}
