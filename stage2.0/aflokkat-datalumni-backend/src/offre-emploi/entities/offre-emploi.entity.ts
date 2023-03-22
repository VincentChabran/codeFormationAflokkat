import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class OffreEmploi {
   @PrimaryGeneratedColumn()
   @Field()
   id: number;

   @Column()
   @Field()
   nomDuPoste: string;

   @Column()
   @Field()
   nomEntreprise: string;

   @CreateDateColumn()
   @Field()
   dateCreation: Date;

   @Column()
   @Field()
   ville: string;

   @Column()
   @Field()
   typeContrat: string;

   @Column()
   @Field()
   domaineActivite: string;

   @Column()
   @Field()
   descriptionEntreprise: string;

   @Column()
   @Field()
   descriptionPoste: string;

   @Column()
   @Field()
   descriptionProfilCandidat: string;

   @Column({ default: true })
   @Field(() => Boolean)
   active: boolean;

   @Column()
   @Field()
   experienceSouhaitee: string;

   @Column({ default: 'Non renseigné' })
   @Field()
   remuneration: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   emailContact?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   pathLienCandidature?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   dateDebut?: Date;

   @Column({ nullable: true })
   @Field({ nullable: true })
   dateLimiteCandidature?: Date;

   @Column({ nullable: true })
   @Field({ nullable: true })
   pathLogo?: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   pathPieceJointe?: string;

   // Relations

   @Column()
   @Field(() => Int)
   userCreateurId: number;

   @ManyToOne(() => User, (user) => user.offreEmploiCree, { lazy: true, onDelete: 'CASCADE' })
   @Field(() => User)
   userCreateur: Promise<User>;

   // Fonction de transformation avant l'ajout en BDD

   @BeforeInsert()
   firstLetterToUpperCase() {
      this.nomDuPoste = this.nomDuPoste.charAt(0).toUpperCase() + this.nomDuPoste.slice(1);
      this.nomEntreprise = this.nomEntreprise.charAt(0).toUpperCase() + this.nomEntreprise.slice(1);
      this.ville = this.ville.charAt(0).toUpperCase() + this.ville.slice(1);
      this.domaineActivite = this.domaineActivite.charAt(0).toUpperCase() + this.domaineActivite.slice(1);
      this.typeContrat = this.typeContrat.charAt(0).toUpperCase() + this.typeContrat.slice(1);
      this.emailContact = this.emailContact.toLocaleLowerCase();
   }
}
