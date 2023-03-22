import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';
import { ExperiencePro } from '../../experience-pro/entities/experience-pro.entity';
import { Formation } from '../../formation/entities/formation.entity';
import { OffreEmploi } from '../../offre-emploi/entities/offre-emploi.entity';
import { UserRole } from '../dto/enum/UserRole';

@Entity()
@ObjectType()
export class User {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column({ unique: true })
   @Field()
   email: string;

   @Column()
   password: string;

   @Column()
   @Field()
   nom: string;

   @Column()
   @Field()
   prenom: string;

   @Column({ type: 'simple-array', default: UserRole.Etudiant })
   @Field(() => [UserRole])
   roles: UserRole[];

   @Column({ default: true })
   @Field(() => Boolean)
   isActive: boolean;

   @Column({ default: false })
   @Field(() => Boolean)
   mentor: boolean;

   @Column({ default: false })
   @Field(() => Boolean)
   rechercheEmploi: boolean;

   @Column({ nullable: true })
   @Field({ nullable: true })
   profilPictureName?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   telephone?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   dateDeNaissance?: Date;

   // Relations

   @OneToMany(() => Formation, (formation) => formation.user, { nullable: true, lazy: true })
   @Field(() => [Formation], { nullable: true })
   formations?: Promise<Formation[]>;

   @OneToMany(() => ExperiencePro, (experiencePro) => experiencePro.user, { nullable: true, lazy: true })
   @Field(() => [ExperiencePro], { nullable: true })
   experiencePro?: Promise<ExperiencePro[]>;

   @OneToMany(() => OffreEmploi, (offre) => offre.userCreateur, { nullable: true, lazy: true })
   @Field(() => [OffreEmploi], { nullable: true })
   offreEmploiCree?: Promise<OffreEmploi[]>;

   @OneToMany(() => Blog, (blog) => blog.userCreateur, { nullable: true, lazy: true })
   @Field(() => [Blog], { nullable: true })
   blogCree?: Promise<Blog[]>;

   // Fonction de transformation avant l'ajout en BDD

   @BeforeInsert()
   transformDataCreate() {
      this.nom = this.nom.charAt(0).toUpperCase() + this.nom.slice(1);
      this.prenom = this.prenom.charAt(0).toUpperCase() + this.prenom.slice(1);
      this.email = this.email.toLowerCase();
   }
}
