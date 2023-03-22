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
exports.UtilisateursResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const utilisateurs_service_1 = require("./utilisateurs.service");
const utilisateur_entity_1 = require("./entities/utilisateur.entity");
const create_utilisateur_input_1 = require("./dto/create-utilisateur.input");
const update_utilisateur_input_1 = require("./dto/update-utilisateur.input");
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("../notifications/notifications.service");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const login_response_1 = require("../auth/dto/login-response");
let UtilisateursResolver = class UtilisateursResolver {
    constructor(utilisateursService, notificationsService, pubSub) {
        this.utilisateursService = utilisateursService;
        this.notificationsService = notificationsService;
        this.pubSub = pubSub;
    }
    async createUtilisateur(createUtilisateurInput) {
        return await this.utilisateursService.create(createUtilisateurInput);
    }
    findAll() {
        return this.utilisateursService.findAll();
    }
    findOne(email) {
        return this.utilisateursService.findOne(email);
    }
    async updateUtilisateur(updateUtilisateurInput) {
        return await this.utilisateursService.update(updateUtilisateurInput.id, updateUtilisateurInput);
    }
    async removeUtilisateurNotification(id, notificationId) {
        const updatedUtilisateur = await this.utilisateursService.removeUtilisateurNotification(id, notificationId);
        await this.notificationsService.remove(notificationId);
        this.pubSub.publish("sendNotification", {
            sendNotification: {
                notifications: await this.notificationsService.getNotificationsById(id),
            },
        });
        return updatedUtilisateur;
    }
    async removeUtilisateur(id) {
        return this.utilisateursService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => utilisateur_entity_1.Utilisateur),
    __param(0, (0, graphql_1.Args)("createUtilisateurInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_utilisateur_input_1.CreateUtilisateurInput]),
    __metadata("design:returntype", Promise)
], UtilisateursResolver.prototype, "createUtilisateur", null);
__decorate([
    (0, graphql_1.Query)(() => [utilisateur_entity_1.Utilisateur], { name: "utilisateurs" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UtilisateursResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => utilisateur_entity_1.Utilisateur, { name: "utilisateur" }),
    __param(0, (0, graphql_1.Args)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilisateursResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => login_response_1.LoginResponse),
    __param(0, (0, graphql_1.Args)("updateUtilisateurInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_utilisateur_input_1.UpdateUtilisateurInput]),
    __metadata("design:returntype", Promise)
], UtilisateursResolver.prototype, "updateUtilisateur", null);
__decorate([
    (0, graphql_1.Mutation)(() => utilisateur_entity_1.Utilisateur),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)("notificationId", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UtilisateursResolver.prototype, "removeUtilisateurNotification", null);
__decorate([
    (0, graphql_1.Mutation)(() => utilisateur_entity_1.Utilisateur),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UtilisateursResolver.prototype, "removeUtilisateur", null);
UtilisateursResolver = __decorate([
    (0, graphql_1.Resolver)(() => utilisateur_entity_1.Utilisateur),
    __param(2, (0, common_1.Inject)("PUB_SUB")),
    __metadata("design:paramtypes", [utilisateurs_service_1.UtilisateursService,
        notifications_service_1.NotificationsService,
        graphql_subscriptions_1.PubSubEngine])
], UtilisateursResolver);
exports.UtilisateursResolver = UtilisateursResolver;
//# sourceMappingURL=utilisateurs.resolver.js.map