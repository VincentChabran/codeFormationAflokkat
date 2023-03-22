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
exports.MessagesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const messages_service_1 = require("./messages.service");
const message_entity_1 = require("./entities/message.entity");
const create_message_input_1 = require("./dto/create-message.input");
const update_message_input_1 = require("./dto/update-message.input");
const common_1 = require("@nestjs/common");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const notifications_service_1 = require("../notifications/notifications.service");
let MessagesResolver = class MessagesResolver {
    constructor(messagesService, notificationsService, pubSub) {
        this.messagesService = messagesService;
        this.notificationsService = notificationsService;
        this.pubSub = pubSub;
    }
    async createMessage(createMessageInput) {
        const newMessage = await this.messagesService.create(createMessageInput);
        const participants = await (await newMessage.reclamation).participants;
        for (let i = 0; i < participants.length; i++) {
            if (createMessageInput.auteurId !== participants[i].id) {
                await this.notificationsService.create({
                    notification: `De nouveaux messages sont disponibles pour la réclamation #${newMessage.reclamationId}.`,
                    reclamationId: newMessage.reclamationId,
                    utilisateurId: participants[i].id,
                });
                this.pubSub.publish("sendNotification", {
                    sendNotification: { id: participants[i].id },
                });
            }
            this.pubSub.publish("newMessageNotification", {
                newMessageNotification: { id: participants[i].id },
            });
        }
        return newMessage;
    }
    findAll() {
        return this.messagesService.findAll();
    }
    findOne(id) {
        return this.messagesService.findOne(id);
    }
    async updateMessage(updateMessageInput) {
        return await this.messagesService.update(updateMessageInput.id, updateMessageInput);
    }
    async removeMessage(id) {
        return await this.messagesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Message),
    __param(0, (0, graphql_1.Args)("createMessageInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_input_1.CreateMessageInput]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "createMessage", null);
__decorate([
    (0, graphql_1.Query)(() => [message_entity_1.Message], { name: "messages" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => message_entity_1.Message, { name: "message" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Message),
    __param(0, (0, graphql_1.Args)("updateMessageInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_message_input_1.UpdateMessageInput]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "updateMessage", null);
__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Message),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "removeMessage", null);
MessagesResolver = __decorate([
    (0, graphql_1.Resolver)(() => message_entity_1.Message),
    __param(2, (0, common_1.Inject)("PUB_SUB")),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        notifications_service_1.NotificationsService,
        graphql_subscriptions_1.PubSubEngine])
], MessagesResolver);
exports.MessagesResolver = MessagesResolver;
//# sourceMappingURL=messages.resolver.js.map