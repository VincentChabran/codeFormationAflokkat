import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { MailTemplatesService } from "./mail-templates.service";
import { MailTemplate } from "./entities/mail-template.entity";
import { CreateMailTemplateInput } from "./dto/create-mail-template.input";
import { UpdateMailTemplateInput } from "./dto/update-mail-template.input";

@Resolver(() => MailTemplate)
export class MailTemplatesResolver {
   constructor(private readonly mailTemplatesService: MailTemplatesService) {}

   @Mutation(() => MailTemplate)
   async createMailTemplate(
      @Args("createMailTemplateInput")
      createMailTemplateInput: CreateMailTemplateInput
   ) {
      return this.mailTemplatesService.create(createMailTemplateInput);
   }

   @Query(() => [MailTemplate], { name: "mailTemplates" })
   async findAll() {
      return this.mailTemplatesService.findAll();
   }

   @Query(() => MailTemplate, { name: "mailTemplate" })
   async findOne(@Args("id", { type: () => Int }) id: number) {
      return this.mailTemplatesService.findOne(id);
   }

   @Mutation(() => MailTemplate)
   async updateMailTemplate(
      @Args("updateMailTemplateInput")
      updateMailTemplateInput: UpdateMailTemplateInput
   ) {
      return this.mailTemplatesService.update(updateMailTemplateInput.id, updateMailTemplateInput);
   }

   @Mutation(() => MailTemplate)
   async removeMailTemplate(@Args("id", { type: () => Int }) id: number) {
      return this.mailTemplatesService.remove(id);
   }
}
