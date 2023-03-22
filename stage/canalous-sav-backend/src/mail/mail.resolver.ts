import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { LogsService } from "src/logs/logs.service";
import { MailService } from "./mail.service";

@Resolver()
export class MailResolver {
   constructor(private readonly mailService: MailService, private readonly logsService: LogsService) {}

   @Mutation(() => Boolean)
   async sendRetourQuestionnaireEmail(
      @Args("destinataire") destinataire: string,
      @Args("sujet") sujet: string,
      @Args("message") message: string
   ) {
      const success = await this.mailService.sendRetourQuestionnaireMail(destinataire, sujet, message);

      return success;
   }

   @Mutation(() => Boolean)
   async sendEmail(
      @Args("destinataire") destinataire: string,
      @Args("sujet") sujet: string,
      @Args("nom") nom: string,
      @Args("reclamationId") reclamationId: number,
      @Args("propositionId") propositionId: number,
      @Args("geste") geste: string,
      @Args("message") message: string
   ) {
      const success = await this.mailService.sendMail(
         destinataire,
         sujet,
         nom,
         reclamationId,
         propositionId,
         geste,
         message
      );

      await this.logsService.create({
         reclamationId,
         log: "Envoi d'un mail au client",
      });

      return success;
   }
}
