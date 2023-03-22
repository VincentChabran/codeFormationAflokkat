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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const utilisateurs_service_1 = require("../utilisateurs/utilisateurs.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    constructor(utilisateursService, jwtService, mailService) {
        this.utilisateursService = utilisateursService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async validateUser(email, password) {
        const utilisateur = await this.utilisateursService.findOne(email);
        const estValide = await (0, bcrypt_1.compare)(password, utilisateur === null || utilisateur === void 0 ? void 0 : utilisateur.password);
        if (utilisateur && estValide) {
            const { password } = utilisateur, result = __rest(utilisateur, ["password"]);
            return result;
        }
        return null;
    }
    async login(loginUserInput) {
        const utilisateur = await this.utilisateursService.findOne(loginUserInput.email);
        return {
            access_token: this.jwtService.sign({
                id: utilisateur.id,
                nom: utilisateur.nom,
                email: utilisateur.email,
                role: utilisateur.role,
            }),
            utilisateur,
        };
    }
    async signup(signupUserInput) {
        const user = await this.utilisateursService.findOne(signupUserInput.email);
        if (user) {
            throw new Error("Cet utilisateur existe déjà.");
        }
        const password = await (0, bcrypt_1.hash)(signupUserInput.password, 10);
        const newUser = this.utilisateursService.create(Object.assign(Object.assign({}, signupUserInput), { password }));
        return newUser;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utilisateurs_service_1.UtilisateursService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map