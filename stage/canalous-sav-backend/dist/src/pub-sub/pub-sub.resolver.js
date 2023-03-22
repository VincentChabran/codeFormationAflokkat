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
exports.PubSubResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const notification_entity_1 = require("../notifications/entities/notification.entity");
let PubSubResolver = class PubSubResolver {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    refetching() {
        return this.pubSub.asyncIterator("refetching");
    }
    sendNotification() {
        return this.pubSub.asyncIterator("sendNotification");
    }
    newRapportNotification() {
        return this.pubSub.asyncIterator("newRapportNotification");
    }
    newMessageNotification() {
        return this.pubSub.asyncIterator("newMessageNotification");
    }
    updatedReclamation() {
        return this.pubSub.asyncIterator("updatedReclamation");
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => notification_entity_1.IdsForReFetching),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PubSubResolver.prototype, "refetching", null);
__decorate([
    (0, graphql_1.Subscription)(() => notification_entity_1.NewNotification),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PubSubResolver.prototype, "sendNotification", null);
__decorate([
    (0, graphql_1.Subscription)(() => notification_entity_1.NewNotification),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PubSubResolver.prototype, "newRapportNotification", null);
__decorate([
    (0, graphql_1.Subscription)(() => notification_entity_1.NewNotification),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PubSubResolver.prototype, "newMessageNotification", null);
__decorate([
    (0, graphql_1.Subscription)(() => notification_entity_1.NewNotification),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PubSubResolver.prototype, "updatedReclamation", null);
PubSubResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(0, (0, common_1.Inject)("PUB_SUB")),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSubEngine])
], PubSubResolver);
exports.PubSubResolver = PubSubResolver;
//# sourceMappingURL=pub-sub.resolver.js.map