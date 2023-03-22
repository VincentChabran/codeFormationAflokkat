import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Rapport {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field(() => Boolean)
   clientImmobilise: boolean;

   @Column({ nullable: true })
   @Field({ nullable: true })
   clientImmobiliseRaison: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   dureeImmobilisation: string;

   @Column()
   @Field(() => Boolean)
   gesteCommercial: boolean;

   @Column({ nullable: true })
   @Field({ nullable: true })
   geste: string;

   @Column({ nullable: true })
   @Field(() => Float, { nullable: true })
   montantGeste: number;

   @Column()
   @Field(() => Boolean)
   sinistre: boolean;

   @Column({ nullable: true })
   @Field({ nullable: true })
   natureSinistre: string;

   @Column("text", { nullable: true })
   @Field({ nullable: true })
   rapport: string;

   // **************************************************** Remove User
   @Column({ nullable: true })
   @Field({ nullable: true })
   auteurId?: number;

   @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.rapports, {
      lazy: true,
      onDelete: "SET NULL",
   })
   @Field(() => Utilisateur, { nullable: true })
   auteur?: Promise<Utilisateur>;
   // **************************************************

   @Column()
   reclamationId: number;

   @ManyToOne(() => Reclamation, (reclamation) => reclamation.rapports, {
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

@ObjectType()
export class Validation {
   @Field()
   message: String;
}
