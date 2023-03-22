import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class ExperiencePro {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field()
   fonction: string;

   @Column()
   @Field()
   entreprise: string;

   @Column()
   @Field()
   dateDebut: string;

   @Column()
   @Field()
   dateFin: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   description?: string;

   // Relations

   @Column()
   @Field(() => Int)
   userId: number;

   @ManyToOne(() => User, (user) => user.experiencePro, { lazy: true, onDelete: 'CASCADE' })
   @Field(() => User)
   user: Promise<User>;

   // Fonction de transformation avant l'ajout en BDD

   @BeforeInsert()
   firstLetterToUpperCase() {
      this.fonction = this.fonction.charAt(0).toUpperCase() + this.fonction.slice(1);
      this.entreprise = this.entreprise.charAt(0).toUpperCase() + this.entreprise.slice(1);
   }
}
