import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Base {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field(() => Int)
   zone: number;

   @Column()
   @Field()
   nom: string;

   @Column()
   @Field()
   adresse: string;

   @Column()
   @Field()
   chef: string;

   @Column()
   @Field()
   email: string;

   @Column()
   @Field()
   tel: string;

   // *********************************** Remove user
   @Column({ nullable: true })
   @Field({ nullable: true })
   responsableId: number;

   @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.bases, {
      lazy: true,
      onDelete: "SET NULL",
   })
   @Field(() => Utilisateur)
   responsable: Promise<Utilisateur>;
   // ****************************************************

   @ManyToMany(() => Reclamation, (reclamation) => reclamation.bases, {
      lazy: true,
   })
   @JoinTable()
   @Field(() => [Reclamation])
   reclamations: Promise<Reclamation[]>;
}

@Entity()
@ObjectType()
export class ReservationBis {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field({ nullable: true })
   datecreation: string;

   @Column()
   @Field({ nullable: true })
   datedepart: string;

   @Column()
   @Field({ nullable: true })
   datearrivee: string;

   @Column()
   @Field({ nullable: true })
   prix: number;

   @Column()
   @Field({ nullable: true })
   nomclient: string;

   @Column()
   @Field(() => Int, { nullable: true })
   numclient: number;

   @Column()
   @Field({ nullable: true })
   bateau: string;

   @Column()
   @Field(() => Int, { nullable: true })
   basedepart: number;

   @Column()
   @Field(() => Int, { nullable: true })
   basearrivee: number;

   @Column()
   @Field({ nullable: true })
   nombasedepart: string;

   @Column()
   @Field({ nullable: true })
   nombasearrivee: string;
}
