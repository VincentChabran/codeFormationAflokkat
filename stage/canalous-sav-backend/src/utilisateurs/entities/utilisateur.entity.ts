import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";
import { Base } from "src/bases/entities/base.entity";
import { Message } from "src/messages/entities/message.entity";
import { Notification } from "src/notifications/entities/notification.entity";
import { Rapport } from "src/rapports/entities/rapport.entity";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Utilisateur {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field()
   nom: string;

   @Column()
   @Field()
   email: string;

   @Column()
   password: string;

   @Column()
   @Field()
   role: string;

   @OneToMany(() => Base, (base) => base.responsable, { lazy: true })
   @Field(() => [Base])
   bases: Promise<Base[]>;

   @OneToMany(() => Reclamation, (reclamation) => reclamation.responsable, {
      lazy: true,
   })
   @Field(() => [Reclamation])
   estResponsable: Promise<Reclamation[]>;

   @OneToMany(() => Rapport, (rapport) => rapport.auteur, { lazy: true })
   @Field(() => [Rapport])
   rapports: Promise<Rapport[]>;

   @OneToMany(() => Message, (message) => message.auteur, { lazy: true })
   @Field(() => [Message])
   messages: Promise<Message[]>;

   @ManyToMany(() => Reclamation, (reclamation) => reclamation.participants, {
      lazy: true,
   })
   @JoinTable()
   @Field(() => [Reclamation])
   participe: Promise<Reclamation[]>;

   @OneToMany(() => Notification, (notification) => notification.utilisateur, {
      lazy: true,
   })
   @Field(() => [Notification])
   notifications: Promise<Notification[]>;
}

@InputType()
export class UtilisateurInput {
   @Field(() => Int)
   id: number;

   @Field()
   nom: string;

   @Field()
   email: string;

   @Field()
   role: string;
}
