"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseFilesModule = void 0;
const common_1 = require("@nestjs/common");
const database_files_service_1 = require("./database-files.service");
const database_files_resolver_1 = require("./database-files.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const databaseFile_entity_1 = require("./entities/databaseFile.entity");
const notifications_module_1 = require("../notifications/notifications.module");
const logs_module_1 = require("../logs/logs.module");
const pub_sub_module_1 = require("../pub-sub/pub-sub.module");
let DatabaseFilesModule = class DatabaseFilesModule {
};
DatabaseFilesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([databaseFile_entity_1.default]), notifications_module_1.NotificationsModule, logs_module_1.LogsModule, pub_sub_module_1.PubSubModule],
        providers: [database_files_resolver_1.DatabaseFilesResolver, database_files_service_1.DatabaseFilesService],
        exports: [database_files_service_1.DatabaseFilesService],
    })
], DatabaseFilesModule);
exports.DatabaseFilesModule = DatabaseFilesModule;
//# sourceMappingURL=database-files.module.js.map