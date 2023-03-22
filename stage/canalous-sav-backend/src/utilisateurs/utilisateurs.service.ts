import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcrypt";
import { DeleteResult, Not, Repository } from "typeorm";
import { CreateUtilisateurInput } from "./dto/create-utilisateur.input";
import { UpdateUtilisateurInput } from "./dto/update-utilisateur.input";
import { Utilisateur } from "./entities/utilisateur.entity";

@Injectable()
export class UtilisateursService {
   constructor(
      @InjectRepository(Utilisateur)
      private utilisateursRepository: Repository<Utilisateur>,
      private jwtService: JwtService
   ) {}

   async create(createUtilisateurInput: CreateUtilisateurInput): Promise<Utilisateur> {
      const newUtilisateur = this.utilisateursRepository.create(createUtilisateurInput);
      return await this.utilisateursRepository.save(newUtilisateur);
   }

   async findAll(): Promise<Utilisateur[]> {
      return await this.utilisateursRepository.find();
   }

   async findAllDirection(): Promise<Utilisateur[]> {
      return await this.utilisateursRepository.find({
         where: { role: "direction" },
      });
   }

   async findAllDirectionButOne(id: number): Promise<Utilisateur[]> {
      return await this.utilisateursRepository.find({
         where: { role: "direction", id: Not(id) },
      });
   }

   async findOne(email: string): Promise<Utilisateur | null> {
      return await this.utilisateursRepository.findOne({
         where: { email },
      });
   }

   async update(id: number, updateUtilisateurInput: UpdateUtilisateurInput) {
      const password = updateUtilisateurInput.password ? await hash(updateUtilisateurInput.password, 10) : null;
      console.log(password, updateUtilisateurInput);
      await this.utilisateursRepository.update(id, {
         ...updateUtilisateurInput,
         ...(password && { password }),
      });
      const utilisateur = await this.utilisateursRepository.findOne(id);
      return {
         access_token: this.jwtService.sign({
            id,
            nom: utilisateur.nom,
            email: utilisateur.email,
            role: utilisateur.role,
         }),
         utilisateur,
      };
   }

   async removeUtilisateurNotification(id: number, notificationId: number): Promise<Utilisateur | null> {
      const utilisateur = await this.utilisateursRepository.findOneOrFail(id);

      utilisateur.notifications = Promise.resolve(
         (await utilisateur.notifications).filter((notif: any) => {
            return notif.id !== notificationId;
         })
      );

      return utilisateur;
   }

   async remove(id: number): Promise<DeleteResult> {
      return await this.utilisateursRepository.delete(id);
   }
}
