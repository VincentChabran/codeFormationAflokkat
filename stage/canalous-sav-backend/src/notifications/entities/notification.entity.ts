import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Utilisateur } from "src/utilisateurs/entities/utilisateur.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Notification {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field()
   notification: string;

   @Column()
   reclamationId: number;

   @ManyToOne(() => Reclamation, (reclamation) => reclamation.notifications, {
      lazy: true,
      onDelete: "CASCADE",
   })
   @Field(() => Reclamation)
   reclamation: Promise<Reclamation>;

   @Column()
   utilisateurId: number;

   @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.notifications, {
      lazy: true,
      cascade: true,
      onDelete: "CASCADE",
   })
   @Field(() => Utilisateur)
   utilisateur: Promise<Utilisateur>;
}

@ObjectType()
export class IdsForReFetching {
   @Field(() => [Int])
   ids: number[];
}

@ObjectType()
export class NewNotification {
   @Field(() => Int)
   id: number;
}
