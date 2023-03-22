import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Questionnaire {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field(() => Int)
   numreservation: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   booking_online_simplicity: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   booking_online_information: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   booking_commercial_reception: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   booking_commercial_response_time: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   booking_commercial_information: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   stay_reception_boarding: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   stay_reception_landing: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   stay_reception_stopover: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   boat_comfort: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   boat_cleanliness: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   boat_equipment: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   instruction_clear: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   instruction_suitable: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   instruction_sufficient: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   technical_service_available: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   technical_service_timeliness: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   technical_service_relational: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   general_appreciation_stay: number;

   @Column({ nullable: true })
   @Field(() => Int, { nullable: true })
   recommend_us: number;

   @Column("text", { nullable: true })
   @Field({ nullable: true })
   comments: string;

   // Client

   @Column()
   @Field(() => Int)
   numclient: number;

   @Column()
   @Field()
   nomclient: string;

   @Column()
   @Field()
   email: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   tel?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   portable?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   adresse?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   codepostal?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   ville?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   pays?: string;

   // Réservation

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

   // Autres

   @Column()
   @Field()
   date: string;

   @Column()
   @Field()
   statut: string;

   @OneToOne(() => Reclamation, (reclamation) => reclamation.questionnaire, {
      lazy: true,
      nullable: true,
      onDelete: "SET NULL",
   })
   @Field(() => Reclamation, { nullable: true })
   reclamation?: Promise<Reclamation>;
}
