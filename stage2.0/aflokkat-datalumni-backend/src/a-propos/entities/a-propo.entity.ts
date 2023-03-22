import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class APropo {
   @PrimaryGeneratedColumn()
   @Field(() => Int)
   id: number;

   @Column()
   @Field()
   message: string;
}
