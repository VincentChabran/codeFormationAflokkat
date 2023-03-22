import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Message {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column("text")
   @Field()
   message: string;

   // **************************************************** Remove User
   @Column({ nullable: true })
   @Field({ nullable: true })
   auteurId?: number;

   @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.messages, {
      lazy: true,
      onDelete: "SET NULL",
   })
   @Field(() => Utilisateur, { nullable: true })
   auteur?: Promise<Utilisateur>;

   // ***************************************************
   @Column()
   reclamationId: number;

   @ManyToOne(() => Reclamation, (reclamation) => reclamation.messages, {
      lazy: true,
      onDelete: "CASCADE",
   })
   @Field(() => Reclamation)
   reclamation: Promise<Reclamation>;

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date;

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date;
}
