import { DeleteResult, Repository } from "typeorm";
import { CreateMailTemplateInput } from "./dto/create-mail-template.input";
import { UpdateMailTemplateInput } from "./dto/update-mail-template.input";
import { MailTemplate } from "./entities/mail-template.entity";
export declare class MailTemplatesService {
    private mailTemplatesRepository;
    constructor(mailTemplatesRepository: Repository<MailTemplate>);
    create(createMailTemplateInput: CreateMailTemplateInput): Promise<MailTemplate>;
    findAll(): Promise<MailTemplate[]>;
    findOne(id: number): Promise<MailTemplate | null>;
    update(id: number, updateMailTemplateInput: UpdateMailTemplateInput): Promise<MailTemplate | null>;
    remove(id: number): Promise<DeleteResult>;
}
