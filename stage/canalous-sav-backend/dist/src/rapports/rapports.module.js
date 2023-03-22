"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RapportsModule = void 0;
const common_1 = require("@nestjs/common");
const rapports_service_1 = require("./rapports.service");
const rapports_resolver_1 = require("./rapports.resolver");
const rapport_entity_1 = require("./entities/rapport.entity");
const typeorm_1 = require("@nestjs/typeorm");
const notifications_module_1 = require("../notifications/notifications.module");
const pub_sub_module_1 = require("../pub-sub/pub-sub.module");
const logs_module_1 = require("../logs/logs.module");
let RapportsModule = class RapportsModule {
};
RapportsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rapport_entity_1.Rapport]), notifications_module_1.NotificationsModule, logs_module_1.LogsModule, pub_sub_module_1.PubSubModule],
        providers: [rapports_resolver_1.RapportsResolver, rapports_service_1.RapportsService],
    })
], RapportsModule);
exports.RapportsModule = RapportsModule;
//# sourceMappingURL=rapports.module.js.map