import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Base } from "src/bases/entities/base.entity";
import { Client } from "src/clients/entities/client.entity";
import DatabaseFile from "src/database-files/entities/databaseFile.entity";
import { Log } from "src/logs/entities/log.entity";
import { Message } from "src/messages/entities/message.entity";
import { Notification } from "src/notifications/entities/notification.entity";
import { Proposition } from "src/propositions/entities/proposition.entity";
import { Questionnaire } from "src/questionnaires/entities/questionnaire.entity";
import { Rapport } from "src/rapports/entities/rapport.entity";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import {
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   ManyToMany,
   ManyToOne,
   OneToMany,
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Reclamation {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column("text")
   @Field()
   reclamation: string;

   @Column({ default: "Nouvellement créée" })
   @Field()
   statut: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   geste: string;

   @Column()
   clientId: number;

   @ManyToOne(() => Client, (client) => client.reclamations, {
      lazy: true,
   })
   @Field(() => Client)
   client: Promise<Client>;

   @Column()
   responsableId: number;

   @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.estResponsable, {
      lazy: true,
   })
   @Field(() => Utilisateur)
   responsable: Promise<Utilisateur>;

   @OneToMany(() => Rapport, (rapport) => rapport.reclamation, { lazy: true })
   @Field(() => [Rapport])
   rapports: Promise<Rapport[]>;

   @OneToMany(() => Message, (message) => message.reclamation, { lazy: true })
   @Field(() => [Message])
   messages: Promise<Message[]>;

   @OneToMany(() => Proposition, (proposition) => proposition.reclamation, {
      lazy: true,
   })
   @Field(() => [Proposition])
   propositions: Promise<Proposition[]>;

   @OneToMany(() => Notification, (notification) => notification.reclamation, {
      lazy: true,
   })
   @Field(() => [Notification])
   notifications: Promise<Notification[]>;

   @ManyToMany(() => Utilisateur, (utilisateur) => utilisateur.participe, {
      lazy: true,
      eager: true,
      cascade: true,
      onDelete: "CASCADE",
   })
   @Field(() => [Utilisateur])
   participants: Promise<Utilisateur[]>;

   @ManyToMany(() => Base, (base) => base.reclamations, {
      lazy: true,
      eager: true,
      cascade: true,
      onDelete: "CASCADE",
   })
   @Field(() => [Base])
   bases: Promise<Base[]>;

   @OneToMany(() => Log, (log) => log.reclamation, {
      lazy: true,
   })
   @Field(() => [Log])
   logs: Promise<Log[]>;

   @OneToOne(() => Reservation, (reservation) => reservation.reclamation, {
      lazy: true,
   })
   @Field(() => Reservation)
   @JoinColumn()
   reservation: Promise<Reservation>;

   @OneToOne(() => Questionnaire, (questionnaire) => questionnaire.reclamation, {
      lazy: true,
      nullable: true,
   })
   @Field(() => Questionnaire, { nullable: true })
   @JoinColumn()
   questionnaire?: Promise<Questionnaire>;

   @OneToMany(() => DatabaseFile, (databaseFile) => databaseFile.reclamation, {
      lazy: true,
   })
   @Field(() => [DatabaseFile])
   @JoinColumn()
   files: Promise<DatabaseFile[]>;

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date;

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date;
}
