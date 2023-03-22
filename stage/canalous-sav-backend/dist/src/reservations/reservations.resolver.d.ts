import { ReservationsService } from "./reservations.service";
import { Reservation } from "./entities/reservation.entity";
import { CreateReservationInput } from "./dto/create-reservation.input";
import { UpdateReservationInput } from "./dto/update-reservation.input";
export declare class ReservationsResolver {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    createReservation(createReservationInput: CreateReservationInput): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    updateReservation(updateReservationInput: UpdateReservationInput): string;
    removeReservation(id: number): string;
}
