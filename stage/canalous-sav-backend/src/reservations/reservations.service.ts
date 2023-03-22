import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReservationInput } from "./dto/create-reservation.input";
import { UpdateReservationInput } from "./dto/update-reservation.input";
import { Reservation } from "./entities/reservation.entity";

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private reservationsRepository: Repository<Reservation>
    ) {}

    async create(createReservationInput: CreateReservationInput): Promise<Reservation> {
        const reservation = this.reservationsRepository.create(createReservationInput);
        return await this.reservationsRepository.save(reservation);
    }

    async findAll(): Promise<Reservation[]> {
        return await this.reservationsRepository.find();
    }

    async findOne(id: number): Promise<Reservation | null> {
        return await this.reservationsRepository.findOne(id);
    }

    update(id: number, updateReservationInput: UpdateReservationInput) {
        return `This action updates a #${id} reservation`;
    }

    remove(id: number) {
        return `This action removes a #${id} reservation`;
    }
}
