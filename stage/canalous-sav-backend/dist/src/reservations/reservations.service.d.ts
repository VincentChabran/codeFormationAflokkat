import { Repository } from "typeorm";
import { CreateReservationInput } from "./dto/create-reservation.input";
import { UpdateReservationInput } from "./dto/update-reservation.input";
import { Reservation } from "./entities/reservation.entity";
export declare class ReservationsService {
    private reservationsRepository;
    constructor(reservationsRepository: Repository<Reservation>);
    create(createReservationInput: CreateReservationInput): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation | null>;
    update(id: number, updateReservationInput: UpdateReservationInput): string;
    remove(id: number): string;
}
