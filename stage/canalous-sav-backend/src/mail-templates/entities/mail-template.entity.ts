import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class MailTemplate {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    nom: string;

    @Column("text")
    @Field()
    fr: string;

    @Column("text")
    @Field()
    en: string;

    @Column("text")
    @Field()
    de: string;
}
