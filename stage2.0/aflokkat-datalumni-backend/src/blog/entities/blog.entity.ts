import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Blog {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field()
   title: string;

   @Column()
   @Field()
   categorie: string;

   @Column()
   @Field()
   content: string;

   @Column()
   @Field()
   pathImg: string;

   @CreateDateColumn()
   @Field()
   dateCreation: Date;

   // Relations

   @Column()
   @Field(() => Int)
   userCreateurId: number;

   @ManyToOne(() => User, (user) => user.blogCree, { lazy: true, onDelete: 'CASCADE' })
   @Field(() => User)
   userCreateur: Promise<User>;
}
