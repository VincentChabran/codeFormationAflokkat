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
exports.BasesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const bases_service_1 = require("./bases.service");
const base_entity_1 = require("./entities/base.entity");
const create_base_input_1 = require("./dto/create-base.input");
const update_base_input_1 = require("./dto/update-base.input");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const auth_service_1 = require("../auth/auth.service");
const utilisateurs_service_1 = require("../utilisateurs/utilisateurs.service");
const client_entity_1 = require("../clients/entities/client.entity");
const api_1 = require("../utils/api");
let BasesResolver = class BasesResolver {
    constructor(basesService, utilisateursService, authService, httpService) {
        this.basesService = basesService;
        this.utilisateursService = utilisateursService;
        this.authService = authService;
        this.httpService = httpService;
    }
    async createBase(createBaseInput) {
        const utilisateur = await this.utilisateursService.findOne(createBaseInput.email);
        if (!utilisateur) {
            const newUtilisateur = await this.authService.signup({
                nom: createBaseInput.chef,
                email: createBaseInput.email,
                password: "password",
                role: "base",
            });
            return await this.basesService.create(Object.assign(Object.assign({}, createBaseInput), { responsableId: newUtilisateur.id }));
        }
        else {
            return await this.basesService.create(Object.assign(Object.assign({}, createBaseInput), { responsableId: utilisateur.id }));
        }
    }
    async SynchronizeBases() {
        const bases = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${api_1.api}/chefs-de-base`).pipe((0, operators_1.map)((res) => res.data)));
        for (let i = 0; i < bases.length; i++) {
            const utilisateur = await this.utilisateursService.findOne(bases[i].email);
            if (!utilisateur) {
                const newUtilisateur = await this.authService.signup({
                    nom: bases[i].chef,
                    email: bases[i].email,
                    password: "password",
                    role: "base",
                });
                await this.basesService.create(Object.assign(Object.assign({}, bases[i]), { responsableId: newUtilisateur.id }));
            }
            else {
                await this.basesService.create(Object.assign(Object.assign({}, bases[i]), { responsableId: utilisateur.id }));
            }
        }
        return bases;
    }
    async findReservation(param) {
        if (!param)
            return null;
        if (parseInt(param)) {
            const reservation = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${api_1.api}/reservationById/${param}`).pipe((0, operators_1.map)((res) => res.data)));
            return reservation;
        }
        else {
            const reservation = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${api_1.api}/reservationByClient/${param}`).pipe((0, operators_1.map)((res) => res.data)));
            return reservation;
        }
    }
    async getClientInfos(id) {
        const client = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${api_1.api}/clientInfos/${id}`).pipe((0, operators_1.map)((res) => res.data)));
        return client;
    }
    findAll() {
        return this.basesService.findAll();
    }
    findOne(id) {
        return this.basesService.findOne(id);
    }
    async updateBase(updateBaseInput) {
        return await this.basesService.update(updateBaseInput.id, updateBaseInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => base_entity_1.Base),
    __param(0, (0, graphql_1.Args)("createBaseInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_base_input_1.CreateBaseInput]),
    __metadata("design:returntype", Promise)
], BasesResolver.prototype, "createBase", null);
__decorate([
    (0, graphql_1.Mutation)(() => [base_entity_1.Base]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BasesResolver.prototype, "SynchronizeBases", null);
__decorate([
    (0, graphql_1.Query)(() => [base_entity_1.ReservationBis]),
    __param(0, (0, graphql_1.Args)("param")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BasesResolver.prototype, "findReservation", null);
__decorate([
    (0, graphql_1.Query)(() => [client_entity_1.Client]),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BasesResolver.prototype, "getClientInfos", null);
__decorate([
    (0, graphql_1.Query)(() => [base_entity_1.Base], { name: "bases" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BasesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => base_entity_1.Base, { name: "base" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BasesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => base_entity_1.Base),
    __param(0, (0, graphql_1.Args)("updateBaseInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_base_input_1.UpdateBaseInput]),
    __metadata("design:returntype", Promise)
], BasesResolver.prototype, "updateBase", null);
BasesResolver = __decorate([
    (0, graphql_1.Resolver)(() => base_entity_1.Base),
    __metadata("design:paramtypes", [bases_service_1.BasesService,
        utilisateurs_service_1.UtilisateursService,
        auth_service_1.AuthService,
        axios_1.HttpService])
], BasesResolver);
exports.BasesResolver = BasesResolver;
//# sourceMappingURL=bases.resolver.js.map