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
exports.BasesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_entity_1 = require("./entities/base.entity");
let BasesService = class BasesService {
    constructor(basesRepository) {
        this.basesRepository = basesRepository;
    }
    async create(createBaseInput) {
        const newBase = this.basesRepository.create(createBaseInput);
        return await this.basesRepository.save(newBase);
    }
    async findAll() {
        return await this.basesRepository.find();
    }
    async findAllWithIds(ids) {
        return await this.basesRepository.find({ where: { id: (0, typeorm_2.In)(ids) } });
    }
    async findOne(id) {
        return await this.basesRepository.findOneOrFail(id);
    }
    async update(id, updateBaseInput) {
        const base = await this.basesRepository.findOneOrFail(id);
        const updatedBase = await this.basesRepository.update(id, updateBaseInput);
        return await this.basesRepository.findOne(id);
    }
    async remove(id) {
        return `This action removes a #${id} base`;
    }
};
BasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(base_entity_1.Base)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BasesService);
exports.BasesService = BasesService;
//# sourceMappingURL=bases.service.js.map