import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Reclamation } from "src/reclamations/entities/reclamation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Client {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    nom: string;

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

    @OneToMany(() => Reclamation, (reclamation) => reclamation.client, {
        lazy: true,
    })
    @Field(() => [Reclamation])
    reclamations: Promise<Reclamation[]>;
}
