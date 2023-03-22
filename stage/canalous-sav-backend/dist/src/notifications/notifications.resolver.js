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
exports.NotificationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const notifications_service_1 = require("./notifications.service");
const notification_entity_1 = require("./entities/notification.entity");
const create_notification_input_1 = require("./dto/create-notification.input");
const update_notification_input_1 = require("./dto/update-notification.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
const logs_service_1 = require("../logs/logs.service");
let NotificationsResolver = class NotificationsResolver {
    constructor(notificationsService, logsService, pubSub) {
        this.notificationsService = notificationsService;
        this.logsService = logsService;
        this.pubSub = pubSub;
    }
    async createNotification(createNotificationInput) {
        const newNotification = await this.notificationsService.create(createNotificationInput);
        if (createNotificationInput.notification.includes("remplir un rapport")) {
            this.logsService.create({
                reclamationId: createNotificationInput.reclamationId,
                log: `Rapport demandé à ${(await newNotification.utilisateur).nom}`,
            });
        }
        this.pubSub.publish("sendNotification", {
            sendNotification: { id: createNotificationInput.utilisateurId },
        });
        return newNotification;
    }
    findAll() {
        return this.notificationsService.findAll();
    }
    findOne(id) {
        return this.notificationsService.findOne(id);
    }
    getNotificationsById(id) {
        return this.notificationsService.getNotificationsById(id);
    }
    async updateNotification(updateNotificationInput) {
        return await this.notificationsService.update(updateNotificationInput.id, updateNotificationInput);
    }
    async removeNotification(id) {
        return await this.notificationsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => notification_entity_1.Notification),
    __param(0, (0, graphql_1.Args)("createNotificationInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_input_1.CreateNotificationInput]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "createNotification", null);
__decorate([
    (0, graphql_1.Query)(() => [notification_entity_1.Notification], { name: "notifications" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => notification_entity_1.Notification, { name: "notification" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "getNotificationsById", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_entity_1.Notification),
    __param(0, (0, graphql_1.Args)("updateNotificationInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_notification_input_1.UpdateNotificationInput]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "updateNotification", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_entity_1.Notification),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "removeNotification", null);
NotificationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => notification_entity_1.Notification),
    __param(2, (0, common_1.Inject)("PUB_SUB")),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        logs_service_1.LogsService,
        graphql_subscriptions_1.PubSubEngine])
], NotificationsResolver);
exports.NotificationsResolver = NotificationsResolver;
//# sourceMappingURL=notifications.resolver.js.map