"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateursModule = void 0;
const common_1 = require("@nestjs/common");
const utilisateurs_service_1 = require("./utilisateurs.service");
const utilisateurs_resolver_1 = require("./utilisateurs.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const utilisateur_entity_1 = require("./entities/utilisateur.entity");
const notifications_module_1 = require("../notifications/notifications.module");
const jwt_1 = require("@nestjs/jwt");
const pub_sub_module_1 = require("../pub-sub/pub-sub.module");
let UtilisateursModule = class UtilisateursModule {
};
UtilisateursModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([utilisateur_entity_1.Utilisateur]),
            notifications_module_1.NotificationsModule,
            jwt_1.JwtModule.register({
                signOptions: { expiresIn: "60s" },
                secret: "hide-me",
            }),
            pub_sub_module_1.PubSubModule,
        ],
        providers: [utilisateurs_resolver_1.UtilisateursResolver, utilisateurs_service_1.UtilisateursService],
        exports: [utilisateurs_service_1.UtilisateursService],
    })
], UtilisateursModule);
exports.UtilisateursModule = UtilisateursModule;
//# sourceMappingURL=utilisateurs.module.js.map