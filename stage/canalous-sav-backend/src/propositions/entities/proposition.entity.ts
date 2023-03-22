import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
@ObjectType()
export class Proposition {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field()
   geste: string;

   @Column()
   @Field()
   statut: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   commentaire: string;

   @Column()
   reclamationId: number;

   @ManyToOne(() => Reclamation, (reclamation) => reclamation.propositions, {
      lazy: true,
      onDelete: "CASCADE",
   })
   @Field(() => Reclamation)
   reclamation: Promise<Reclamation>;

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date;
}
