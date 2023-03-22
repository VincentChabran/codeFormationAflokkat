"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReclamationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bases_service_1 = require("../bases/bases.service");
const database_files_service_1 = require("../database-files/database-files.service");
const questionnaires_service_1 = require("../questionnaires/questionnaires.service");
const reservations_service_1 = require("../reservations/reservations.service");
const utilisateurs_service_1 = require("../utilisateurs/utilisateurs.service");
const typeorm_2 = require("typeorm");
const reclamation_entity_1 = require("./entities/reclamation.entity");
let ReclamationsService = class ReclamationsService {
    constructor(reclamationsRepository, utilisateursService, basesService, reservationsService, questionnairesService, databaseFilesService) {
        this.reclamationsRepository = reclamationsRepository;
        this.utilisateursService = utilisateursService;
        this.basesService = basesService;
        this.reservationsService = reservationsService;
        this.questionnairesService = questionnairesService;
        this.databaseFilesService = databaseFilesService;
    }
    async create(createReclamationInput, participants, baseIds, questionnaireId, reservationId) {
        const newReclamation = this.reclamationsRepository.create(createReclamationInput);
        const directionMembers = await this.utilisateursService.findAllDirectionButOne(createReclamationInput.responsableId);
        for (let i = 0; i < directionMembers.length; i++) {
            participants.push(directionMembers[i]);
        }
        const bases = await this.basesService.findAllWithIds(baseIds);
        newReclamation.bases = Promise.resolve(bases);
        for (let i = 0; i < bases.length; i++) {
            const baseParticipant = await bases[i].responsable;
            participants.push(baseParticipant);
        }
        bases.forEach((base) => {
            base.responsable;
        });
        newReclamation.participants = Promise.resolve(participants);
        const reservation = await this.reservationsService.findOne(reservationId);
        newReclamation.reservation = Promise.resolve(reservation);
        if (questionnaireId) {
            const questionnaire = await this.questionnairesService.findOne(questionnaireId);
            if (questionnaire)
                newReclamation.questionnaire = Promise.resolve(questionnaire);
        }
        return await this.reclamationsRepository.save(newReclamation);
    }
    async createFromQuestionnaire(createReclamationInput, questionnaireId) {
        const newReclamation = this.reclamationsRepository.create(createReclamationInput);
        const questionnaire = await this.questionnairesService.findOne(questionnaireId);
        newReclamation.questionnaire = Promise.resolve(questionnaire);
        return await this.reclamationsRepository.save(newReclamation);
    }
    async findAll() {
        return await this.reclamationsRepository.find();
    }
    async findByReservationId(id) {
        return await this.reclamationsRepository.findOne({
            where: {
                reservation: {
                    id,
                },
            },
        });
    }
    async findByResponsableId(id) {
        return await this.reclamationsRepository.find({
            where: { responsableId: id },
        });
    }
    async findOne(id) {
        return await this.reclamationsRepository.findOneOrFail(id);
    }
    async linkQuestionnaireToExistingReclamation(questionnaireId, reclamationId) {
        const questionnaire = await this.questionnairesService.findOne(questionnaireId);
        const reclamation = await this.reclamationsRepository.findOne(reclamationId);
        reclamation.questionnaire = Promise.resolve(questionnaire);
        await this.reclamationsRepository.save(reclamation);
        await this.questionnairesService.update(questionnaireId, {
            id: questionnaireId,
            statut: "Réclamation",
        });
        return await this.questionnairesService.findOne(questionnaireId);
    }
    async update(id, updateReclamationInput, newParticipants) {
        const reclamation = await this.reclamationsRepository.findOneOrFail(id);
        const participants = await reclamation.participants;
        participants.push.apply(participants, newParticipants);
        reclamation.participants = Promise.resolve(participants);
        await this.reclamationsRepository.save(reclamation);
        await this.reclamationsRepository.update(id, updateReclamationInput);
        return await this.reclamationsRepository.findOne(id);
    }
    async removeParticipant(id, participantToDeleteId) {
        const reclamation = await this.reclamationsRepository.findOneOrFail(id);
        const participants = await reclamation.participants;
        reclamation.participants = Promise.resolve(participants.filter((participant) => {
            return participant.id !== participantToDeleteId;
        }));
        await this.reclamationsRepository.save(reclamation);
        return await this.reclamationsRepository.findOne(id);
    }
    async remove(id) {
        const deleteReclamation = await this.reclamationsRepository.findOneOrFail(id);
        await this.reclamationsRepository.delete(id);
        return deleteReclamation;
    }
};
ReclamationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reclamation_entity_1.Reclamation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utilisateurs_service_1.UtilisateursService,
        bases_service_1.BasesService,
        reservations_service_1.ReservationsService,
        questionnaires_service_1.QuestionnairesService,
        database_files_service_1.DatabaseFilesService])
], ReclamationsService);
exports.ReclamationsService = ReclamationsService;
//# sourceMappingURL=reclamations.service.js.map