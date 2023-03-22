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
exports.ReservationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const reservations_service_1 = require("./reservations.service");
const reservation_entity_1 = require("./entities/reservation.entity");
const create_reservation_input_1 = require("./dto/create-reservation.input");
const update_reservation_input_1 = require("./dto/update-reservation.input");
let ReservationsResolver = class ReservationsResolver {
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    createReservation(createReservationInput) {
        return this.reservationsService.create(createReservationInput);
    }
    findAll() {
        return this.reservationsService.findAll();
    }
    findOne(id) {
        return this.reservationsService.findOne(id);
    }
    updateReservation(updateReservationInput) {
        return this.reservationsService.update(updateReservationInput.id, updateReservationInput);
    }
    removeReservation(id) {
        return this.reservationsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => reservation_entity_1.Reservation),
    __param(0, (0, graphql_1.Args)("createReservationInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_input_1.CreateReservationInput]),
    __metadata("design:returntype", void 0)
], ReservationsResolver.prototype, "createReservation", null);
__decorate([
    (0, graphql_1.Query)(() => [reservation_entity_1.Reservation], { name: "reservations" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => reservation_entity_1.Reservation, { name: "reservation" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => reservation_entity_1.Reservation),
    __param(0, (0, graphql_1.Args)("updateReservationInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_reservation_input_1.UpdateReservationInput]),
    __metadata("design:returntype", void 0)
], ReservationsResolver.prototype, "updateReservation", null);
__decorate([
    (0, graphql_1.Mutation)(() => reservation_entity_1.Reservation),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationsResolver.prototype, "removeReservation", null);
ReservationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => reservation_entity_1.Reservation),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsResolver);
exports.ReservationsResolver = ReservationsResolver;
//# sourceMappingURL=reservations.resolver.js.map