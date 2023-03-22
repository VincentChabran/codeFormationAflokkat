import { InputType, Int, Field, Float } from "@nestjs/graphql";

@InputType()
export class CreateQuestionnaireInput {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    numreservation: number;

    @Field(() => Int)
    booking_online_simplicity: number;

    @Field(() => Int)
    booking_online_information: number;

    @Field(() => Int)
    booking_commercial_reception: number;

    @Field(() => Int)
    booking_commercial_response_time: number;

    @Field(() => Int)
    booking_commercial_information: number;

    @Field(() => Int)
    stay_reception_boarding: number;

    @Field(() => Int)
    stay_reception_landing: number;

    @Field(() => Int)
    stay_reception_stopover: number;

    @Field(() => Int)
    boat_comfort: number;

    @Field(() => Int)
    boat_cleanliness: number;

    @Field(() => Int)
    boat_equipment: number;

    @Field(() => Int)
    instruction_clear: number;

    @Field(() => Int)
    instruction_suitable: number;

    @Field(() => Int)
    instruction_sufficient: number;

    @Field(() => Int)
    technical_service_available: number;

    @Field(() => Int)
    technical_service_timeliness: number;

    @Field(() => Int)
    technical_service_relational: number;

    @Field(() => Int)
    general_appreciation_stay: number;

    @Field(() => Int)
    recommend_us: number;

    @Field()
    comments: string;

    @Field(() => Int)
    numclient: number;

    @Field()
    nomclient: string;

    @Field()
    email: string;

    @Field()
    tel?: string;

    @Field()
    portable?: string;

    @Field()
    adresse?: string;

    @Field()
    codepostal?: string;

    @Field()
    ville?: string;

    @Field()
    pays?: string;

    @Field(() => Float)
    prix: number;

    @Field()
    bateau: string;

    @Field(() => Int)
    basedepart: number;

    @Field()
    basearrivee: number;

    @Field()
    nombasedepart: string;

    @Field()
    nombasearrivee: string;

    @Field()
    datedepart: string;

    @Field()
    datearrivee: string;

    @Field()
    date: string;

    @Field()
    statut: string;
}
