import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class DatabaseFile {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field()
   filename: string;

   @Column()
   @Field(() => Int)
   reclamationId: number;

   @ManyToOne(() => Reclamation, (reclamation) => reclamation.files, {
      lazy: true,
      onDelete: "CASCADE",
   })
   @Field(() => Reclamation)
   reclamation: Promise<Reclamation>;
}

export default DatabaseFile;
