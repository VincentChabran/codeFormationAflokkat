"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropositionsModule = void 0;
const common_1 = require("@nestjs/common");
const propositions_service_1 = require("./propositions.service");
const propositions_resolver_1 = require("./propositions.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const proposition_entity_1 = require("./entities/proposition.entity");
const logs_module_1 = require("../logs/logs.module");
const notifications_module_1 = require("../notifications/notifications.module");
const pub_sub_module_1 = require("../pub-sub/pub-sub.module");
let PropositionsModule = class PropositionsModule {
};
PropositionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([proposition_entity_1.Proposition]), notifications_module_1.NotificationsModule, logs_module_1.LogsModule, pub_sub_module_1.PubSubModule],
        providers: [propositions_resolver_1.PropositionsResolver, propositions_service_1.PropositionsService],
    })
], PropositionsModule);
exports.PropositionsModule = PropositionsModule;
//# sourceMappingURL=propositions.module.js.map