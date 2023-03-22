import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateNotificationInput } from "./dto/create-notification.input";
import { UpdateNotificationInput } from "./dto/update-notification.input";
import { Notification } from "./entities/notification.entity";

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private notificationsRepository: Repository<Notification>
    ) {}

    async create(createNotificationInput: CreateNotificationInput) {
        const newNotification = this.notificationsRepository.create(createNotificationInput);
        return await this.notificationsRepository.save(newNotification);
    }

    async findAll(): Promise<Notification[]> {
        return await this.notificationsRepository.find();
    }

    async findOne(id: number): Promise<Notification | null> {
        return await this.notificationsRepository.findOneOrFail(id);
    }

    async getNotificationsById(id: number): Promise<Notification[]> {
        return await this.notificationsRepository.find({
            where: { utilisateurId: id },
        });
    }

    async update(id: number, updateNotificationInput: UpdateNotificationInput): Promise<Notification | null> {
        await this.notificationsRepository.findOneOrFail(id);
        await this.notificationsRepository.update(id, updateNotificationInput);
        return await this.notificationsRepository.findOne(id);
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.notificationsRepository.delete(id);
    }
}
