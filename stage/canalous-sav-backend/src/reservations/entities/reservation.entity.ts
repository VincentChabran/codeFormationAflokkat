import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Reservation {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field(() => Float)
   prix: number;

   @Column()
   @Field()
   bateau: string;

   @Column()
   @Field(() => Int)
   basedepart: number;

   @Column()
   @Field(() => Int)
   basearrivee: number;

   @Column()
   @Field()
   nombasedepart: string;

   @Column()
   @Field()
   nombasearrivee: string;

   @Column()
   @Field()
   datedepart: string;

   @Column()
   @Field()
   datearrivee: string;

   @OneToOne(() => Reclamation, (reclamation) => reclamation.reservation, {
      lazy: true,
      onDelete: "SET NULL",
   })
   @Field(() => Reclamation)
   reclamation: Promise<Reclamation>;
}
