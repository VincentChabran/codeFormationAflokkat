"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasesModule = void 0;
const common_1 = require("@nestjs/common");
const bases_service_1 = require("./bases.service");
const bases_resolver_1 = require("./bases.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const base_entity_1 = require("./entities/base.entity");
const axios_1 = require("@nestjs/axios");
const auth_module_1 = require("../auth/auth.module");
const utilisateurs_module_1 = require("../utilisateurs/utilisateurs.module");
let BasesModule = class BasesModule {
};
BasesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([base_entity_1.Base]), axios_1.HttpModule, auth_module_1.AuthModule, utilisateurs_module_1.UtilisateursModule],
        providers: [bases_resolver_1.BasesResolver, bases_service_1.BasesService],
        exports: [bases_service_1.BasesService],
    })
], BasesModule);
exports.BasesModule = BasesModule;
//# sourceMappingURL=bases.module.js.map