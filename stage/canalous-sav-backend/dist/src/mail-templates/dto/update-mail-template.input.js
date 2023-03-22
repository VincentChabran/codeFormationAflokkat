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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMailTemplateInput = void 0;
const create_mail_template_input_1 = require("./create-mail-template.input");
const graphql_1 = require("@nestjs/graphql");
let UpdateMailTemplateInput = class UpdateMailTemplateInput extends (0, graphql_1.PartialType)(create_mail_template_input_1.CreateMailTemplateInput) {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateMailTemplateInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateMailTemplateInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateMailTemplateInput.prototype, "fr", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateMailTemplateInput.prototype, "en", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateMailTemplateInput.prototype, "de", void 0);
UpdateMailTemplateInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateMailTemplateInput);
exports.UpdateMailTemplateInput = UpdateMailTemplateInput;
//# sourceMappingURL=update-mail-template.input.js.map