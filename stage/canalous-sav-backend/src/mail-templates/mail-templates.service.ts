import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateMailTemplateInput } from "./dto/create-mail-template.input";
import { UpdateMailTemplateInput } from "./dto/update-mail-template.input";
import { MailTemplate } from "./entities/mail-template.entity";

@Injectable()
export class MailTemplatesService {
    constructor(
        @InjectRepository(MailTemplate)
        private mailTemplatesRepository: Repository<MailTemplate>
    ) {}

    async create(createMailTemplateInput: CreateMailTemplateInput): Promise<MailTemplate> {
        const newMailTemplate = this.mailTemplatesRepository.create(createMailTemplateInput);
        return await this.mailTemplatesRepository.save(newMailTemplate);
    }

    async findAll(): Promise<MailTemplate[]> {
        return await this.mailTemplatesRepository.find();
    }

    async findOne(id: number): Promise<MailTemplate | null> {
        return await this.mailTemplatesRepository.findOne(id);
    }

    async update(id: number, updateMailTemplateInput: UpdateMailTemplateInput): Promise<MailTemplate | null> {
        await this.mailTemplatesRepository.findOneOrFail(id);
        await this.mailTemplatesRepository.update(id, updateMailTemplateInput);
        return await this.mailTemplatesRepository.findOne(id);
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.mailTemplatesRepository.delete(id);
    }
}
