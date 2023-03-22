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
exports.UpdatePropositionInput = void 0;
const create_proposition_input_1 = require("./create-proposition.input");
const graphql_1 = require("@nestjs/graphql");
let UpdatePropositionInput = class UpdatePropositionInput extends (0, graphql_1.PartialType)(create_proposition_input_1.CreatePropositionInput) {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdatePropositionInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdatePropositionInput.prototype, "statut", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePropositionInput.prototype, "commentaire", void 0);
UpdatePropositionInput = __decorate([
    (0, graphql_1.InputType)()
], UpdatePropositionInput);
exports.UpdatePropositionInput = UpdatePropositionInput;
//# sourceMappingURL=update-proposition.input.js.map