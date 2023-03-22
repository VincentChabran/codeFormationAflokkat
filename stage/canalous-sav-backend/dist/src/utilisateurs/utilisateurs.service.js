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
exports.UtilisateursService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("typeorm");
const utilisateur_entity_1 = require("./entities/utilisateur.entity");
let UtilisateursService = class UtilisateursService {
    constructor(utilisateursRepository, jwtService) {
        this.utilisateursRepository = utilisateursRepository;
        this.jwtService = jwtService;
    }
    async create(createUtilisateurInput) {
        const newUtilisateur = this.utilisateursRepository.create(createUtilisateurInput);
        return await this.utilisateursRepository.save(newUtilisateur);
    }
    async findAll() {
        return await this.utilisateursRepository.find();
    }
    async findAllDirection() {
        return await this.utilisateursRepository.find({
            where: { role: "direction" },
        });
    }
    async findAllDirectionButOne(id) {
        return await this.utilisateursRepository.find({
            where: { role: "direction", id: (0, typeorm_2.Not)(id) },
        });
    }
    async findOne(email) {
        return await this.utilisateursRepository.findOne({
            where: { email },
        });
    }
    async update(id, updateUtilisateurInput) {
        const password = updateUtilisateurInput.password ? await (0, bcrypt_1.hash)(updateUtilisateurInput.password, 10) : null;
        console.log(password, updateUtilisateurInput);
        await this.utilisateursRepository.update(id, Object.assign(Object.assign({}, updateUtilisateurInput), (password && { password })));
        const utilisateur = await this.utilisateursRepository.findOne(id);
        return {
            access_token: this.jwtService.sign({
                id,
                nom: utilisateur.nom,
                email: utilisateur.email,
                role: utilisateur.role,
            }),
            utilisateur,
        };
    }
    async removeUtilisateurNotification(id, notificationId) {
        const utilisateur = await this.utilisateursRepository.findOneOrFail(id);
        utilisateur.notifications = Promise.resolve((await utilisateur.notifications).filter((notif) => {
            return notif.id !== notificationId;
        }));
        return utilisateur;
    }
    async remove(id) {
        return await this.utilisateursRepository.delete(id);
    }
};
UtilisateursService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(utilisateur_entity_1.Utilisateur)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UtilisateursService);
exports.UtilisateursService = UtilisateursService;
//# sourceMappingURL=utilisateurs.service.js.map