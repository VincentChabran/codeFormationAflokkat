import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
// import { ObtentionEnum } from '../dto/enum/ObtentionEnum';
// import { TypeDiplome } from '../dto/enum/TypeDiplome';

@Entity()
@ObjectType()
export class Formation {
   @PrimaryGeneratedColumn()
   @Field()
   id: number;

   @Column()
   @Field()
   nomFormation: string;

   @Column()
   @Field()
   typeDiplome: string;

   @Column()
   @Field()
   nomEtablissement: string;

   @Column()
   @Field()
   obtention: string;

   @Column()
   @Field(() => Int)
   anneeObtention: number;

   @Column()
   @Field()
   domaineActivite: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   description?: string;

   // Relations

   @Column()
   @Field(() => Int)
   userId: number;

   @ManyToOne(() => User, (user) => user.formations, { lazy: true, onDelete: 'CASCADE' })
   @Field(() => User)
   user: Promise<User>;

   // Fonction de transformation avant l'ajout en BDD

   @BeforeInsert()
   firstLetterToUpperCase() {
      this.nomFormation = this.nomFormation.charAt(0).toUpperCase() + this.nomFormation.slice(1);
      this.nomEtablissement = this.nomEtablissement.charAt(0).toUpperCase() + this.nomEtablissement.slice(1);
   }
}
