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
exports.LogsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const logs_service_1 = require("./logs.service");
const log_entity_1 = require("./entities/log.entity");
const create_log_input_1 = require("./dto/create-log.input");
let LogsResolver = class LogsResolver {
    constructor(logService) {
        this.logService = logService;
    }
    async createLog(createLogInput) {
        return await this.logService.create(createLogInput);
    }
    findAll() {
        return this.logService.findAll();
    }
    findOne(id) {
        return this.logService.findOne(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => log_entity_1.Log),
    __param(0, (0, graphql_1.Args)("createLogInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_log_input_1.CreateLogInput]),
    __metadata("design:returntype", Promise)
], LogsResolver.prototype, "createLog", null);
__decorate([
    (0, graphql_1.Query)(() => [log_entity_1.Log], { name: "logs" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LogsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => log_entity_1.Log, { name: "log" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LogsResolver.prototype, "findOne", null);
LogsResolver = __decorate([
    (0, graphql_1.Resolver)(() => log_entity_1.Log),
    __metadata("design:paramtypes", [logs_service_1.LogsService])
], LogsResolver);
exports.LogsResolver = LogsResolver;
//# sourceMappingURL=logs.resolver.js.map