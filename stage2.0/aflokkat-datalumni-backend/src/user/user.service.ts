import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { pathUploadsTemp } from '../utils/constant/pathUploads';
import * as csvToJson from 'csvtojson';
import { hashSync } from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { removeFile } from '../tools/functions/removeFile';
import { JwtPayload } from '../auth/dto/interface/JwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      private mailService: MailService,
      private jwtService: JwtService,
   ) {}

   async create(createUserInput: CreateUserInput): Promise<User> {
      const newUser = this.userRepository.create(createUserInput);
      return await this.userRepository.save(newUser);
   }

   async findAll(): Promise<User[]> {
      return await this.userRepository.find({ where: { isActive: true } });
   }

   async findByIsNotActive(): Promise<User[]> {
      return await this.userRepository.find({ where: { isActive: false } });
   }

   async findOneById(id: number): Promise<User> {
      return await this.userRepository.findOneByOrFail({ id });
   }

   async findOneByEmail(email: string): Promise<User> {
      return await this.userRepository.findOneByOrFail({ email });
   }

   async update(id: number, updateUserInput: UpdateUserInput): Promise<any> {
      const user = await this.userRepository.findOneBy({ id });
      const userUpdate = await this.userRepository.save({ ...user, ...updateUserInput });

      const { password, ...rest } = userUpdate;

      const payload: JwtPayload = {
         id: userUpdate.id.toLocaleString(),
         email: userUpdate.email,
         nom: userUpdate.nom,
         prenom: userUpdate.prenom,
         profilPictureName: userUpdate.profilPictureName,
         roles: userUpdate.roles,
         mentor: userUpdate.mentor,
      };

      return {
         accessToken: this.jwtService.sign(payload),
         user: rest,
      };
   }

   async updateProfilPictureName(profilPictureName: string, user: UpdateUserInput): Promise<void> {
      user.profilPictureName = profilPictureName;
      await this.userRepository.save(user);
   }

   async remove(user: UpdateUserInput): Promise<UpdateUserInput> {
      await this.userRepository.delete(user.id);
      return user;
   }

   async createUsersByCsv(filename: string) {
      const usersArray = [];
      const password = []; // pour le send mail

      await csvToJson()
         .fromFile(pathUploadsTemp + '/' + filename)
         .then(async (el) => usersArray.push(...el));

      // Format les data
      usersArray.forEach((el) => {
         password.push(el.password);
         el.password = hashSync(el.password, 10);
         el.nom = el.nom.charAt(0).toUpperCase() + el.nom.slice(1);
         el.prenom = el.prenom.charAt(0).toUpperCase() + el.prenom.slice(1);
         el.email = el.email.toLowerCase();
      });

      // delete le fichier
      removeFile(pathUploadsTemp, filename);

      // try l'ajout en BDD
      try {
         await this.userRepository.createQueryBuilder().insert().into(User).values(usersArray).execute();
         usersArray.forEach((el, i) => this.mailService.sendEmailAfterCreateUsers(el.nom, el.prenom, el.email, password[i]));
         return 'valide';
      } catch (error) {
         console.log(error.detail);
         return error.detail;
      }
   }
}
