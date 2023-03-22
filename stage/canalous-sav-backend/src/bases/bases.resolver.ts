import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BasesService } from "./bases.service";
import { Base, ReservationBis } from "./entities/base.entity";
import { CreateBaseInput } from "./dto/create-base.input";
import { UpdateBaseInput } from "./dto/update-base.input";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { firstValueFrom } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { UtilisateursService } from "src/utilisateurs/utilisateurs.service";
import { Client } from "src/clients/entities/client.entity";
import { api } from "src/utils/api";

@Resolver(() => Base)
export class BasesResolver {
   constructor(
      private readonly basesService: BasesService,
      private readonly utilisateursService: UtilisateursService,
      private readonly authService: AuthService,
      private httpService: HttpService
   ) {}

   @Mutation(() => Base)
   async createBase(@Args("createBaseInput") createBaseInput: CreateBaseInput) {
      const utilisateur = await this.utilisateursService.findOne(createBaseInput.email);
      if (!utilisateur) {
         const newUtilisateur = await this.authService.signup({
            nom: createBaseInput.chef,
            email: createBaseInput.email,
            password: "password",
            role: "base",
         });

         return await this.basesService.create({
            ...createBaseInput,
            responsableId: newUtilisateur.id,
         });
      } else {
         return await this.basesService.create({
            ...createBaseInput,
            responsableId: utilisateur.id,
         });
      }
   }

   @Mutation(() => [Base])
   async SynchronizeBases() {
      const bases = await firstValueFrom(this.httpService.get(`${api}/chefs-de-base`).pipe(map((res) => res.data)));

      for (let i = 0; i < bases.length; i++) {
         const utilisateur = await this.utilisateursService.findOne(bases[i].email);
         if (!utilisateur) {
            const newUtilisateur = await this.authService.signup({
               nom: bases[i].chef,
               email: bases[i].email,
               password: "password",
               role: "base",
            });
            await this.basesService.create({
               ...bases[i],
               responsableId: newUtilisateur.id,
            });
         } else {
            await this.basesService.create({
               ...bases[i],
               responsableId: utilisateur.id,
            });
         }
      }
      return bases;
   }

   @Query(() => [ReservationBis])
   async findReservation(@Args("param") param: string) {
      if (!param) return null;
      if (parseInt(param)) {
         const reservation = await firstValueFrom(
            this.httpService.get(`${api}/reservationById/${param}`).pipe(map((res) => res.data))
         );

         return reservation;
      } else {
         const reservation = await firstValueFrom(
            this.httpService.get(`${api}/reservationByClient/${param}`).pipe(map((res) => res.data))
         );
         return reservation;
      }
   }

   @Query(() => [Client])
   async getClientInfos(@Args("id") id: number) {
      const client = await firstValueFrom(
         this.httpService.get(`${api}/clientInfos/${id}`).pipe(map((res) => res.data))
      );

      return client;
   }

   @Query(() => [Base], { name: "bases" })
   findAll() {
      return this.basesService.findAll();
   }

   @Query(() => Base, { name: "base" })
   findOne(@Args("id", { type: () => Int }) id: number) {
      return this.basesService.findOne(id);
   }

   @Mutation(() => Base)
   async updateBase(@Args("updateBaseInput") updateBaseInput: UpdateBaseInput) {
      return await this.basesService.update(updateBaseInput.id, updateBaseInput);
   }

   // @Mutation(() => Base)
   // removeBase(@Args('id', { type: () => Int }) id: number) {
   //   return this.basesService.remove(id);
   // }
}
