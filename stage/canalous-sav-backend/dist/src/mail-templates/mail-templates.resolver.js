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
exports.MailTemplatesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const mail_templates_service_1 = require("./mail-templates.service");
const mail_template_entity_1 = require("./entities/mail-template.entity");
const create_mail_template_input_1 = require("./dto/create-mail-template.input");
const update_mail_template_input_1 = require("./dto/update-mail-template.input");
let MailTemplatesResolver = class MailTemplatesResolver {
    constructor(mailTemplatesService) {
        this.mailTemplatesService = mailTemplatesService;
    }
    async createMailTemplate(createMailTemplateInput) {
        return this.mailTemplatesService.create(createMailTemplateInput);
    }
    async findAll() {
        return this.mailTemplatesService.findAll();
    }
    async findOne(id) {
        return this.mailTemplatesService.findOne(id);
    }
    async updateMailTemplate(updateMailTemplateInput) {
        return this.mailTemplatesService.update(updateMailTemplateInput.id, updateMailTemplateInput);
    }
    async removeMailTemplate(id) {
        return this.mailTemplatesService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => mail_template_entity_1.MailTemplate),
    __param(0, (0, graphql_1.Args)("createMailTemplateInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mail_template_input_1.CreateMailTemplateInput]),
    __metadata("design:returntype", Promise)
], MailTemplatesResolver.prototype, "createMailTemplate", null);
__decorate([
    (0, graphql_1.Query)(() => [mail_template_entity_1.MailTemplate], { name: "mailTemplates" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MailTemplatesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => mail_template_entity_1.MailTemplate, { name: "mailTemplate" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MailTemplatesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => mail_template_entity_1.MailTemplate),
    __param(0, (0, graphql_1.Args)("updateMailTemplateInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_mail_template_input_1.UpdateMailTemplateInput]),
    __metadata("design:returntype", Promise)
], MailTemplatesResolver.prototype, "updateMailTemplate", null);
__decorate([
    (0, graphql_1.Mutation)(() => mail_template_entity_1.MailTemplate),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MailTemplatesResolver.prototype, "removeMailTemplate", null);
MailTemplatesResolver = __decorate([
    (0, graphql_1.Resolver)(() => mail_template_entity_1.MailTemplate),
    __metadata("design:paramtypes", [mail_templates_service_1.MailTemplatesService])
], MailTemplatesResolver);
exports.MailTemplatesResolver = MailTemplatesResolver;
//# sourceMappingURL=mail-templates.resolver.js.map