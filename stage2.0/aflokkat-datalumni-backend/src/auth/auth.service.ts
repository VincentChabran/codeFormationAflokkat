import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './dto/interface/JwtPayload';

@Injectable()
export class AuthService {
   constructor(private userService: UserService, private jwtService: JwtService) {}

   async validateUser(email: string, password: string): Promise<any> {
      const user = await this.userService.findOneByEmail(email);

      // Compare les password
      const isValid = await compare(password, user?.password);
      const isActive = user.isActive;

      if (user && isValid && isActive) {
         const { password, ...result } = user;
         return result;
      }
      // Si isActive est false
      else if (user && isValid && !isActive) {
         return "Le compte n'est pas encore activé";
      }

      return null;
   }

   async login(user: User) {
      const payload: JwtPayload = {
         id: user.id.toLocaleString(),
         email: user.email,
         nom: user.nom,
         prenom: user.prenom,
         profilPictureName: user.profilPictureName,
         roles: user.roles,
         mentor: user.mentor,
      };
      return {
         accessToken: this.jwtService.sign(payload),
         user,
      };
   }

   async singup(singupUserInput: CreateUserInput): Promise<User> {
      return this.userService.create(singupUserInput);
   }
}
