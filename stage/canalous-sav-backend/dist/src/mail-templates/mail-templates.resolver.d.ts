import { MailTemplatesService } from "./mail-templates.service";
import { MailTemplate } from "./entities/mail-template.entity";
import { CreateMailTemplateInput } from "./dto/create-mail-template.input";
import { UpdateMailTemplateInput } from "./dto/update-mail-template.input";
export declare class MailTemplatesResolver {
    private readonly mailTemplatesService;
    constructor(mailTemplatesService: MailTemplatesService);
    createMailTemplate(createMailTemplateInput: CreateMailTemplateInput): Promise<MailTemplate>;
    findAll(): Promise<MailTemplate[]>;
    findOne(id: number): Promise<MailTemplate>;
    updateMailTemplate(updateMailTemplateInput: UpdateMailTemplateInput): Promise<MailTemplate>;
    removeMailTemplate(id: number): Promise<import("typeorm").DeleteResult>;
}
