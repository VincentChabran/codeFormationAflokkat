import { UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { uploadFile } from '../tools/functions/uploadFile';
import { RemoveOffreCvTransfertInterceptor } from '../tools/interceptors/remove-offre-cv-transfert.interceptor';
import { pathUploadsOffreCvTransfert } from '../utils/constant/pathUploads';
import { IgnoreJwtGuard } from '../utils/decorator/IgnoreJwtGuard.decorator';
import { CreateMailPostulerOffreInput } from './dto/create-mail-postuler-offre.input';
import { CreationAccountInput } from './dto/creation-account.input';
import { DemandeCreationAccountInput } from './dto/demande-creation-account-input';
import { MailMentorInput } from './dto/mail-mentor.input';
import { ValidationCreationAccountInput } from './dto/validation-creation-account-input';
import { MailService } from './mail.service';

@Resolver()
export class MailResolver {
   constructor(private readonly mailService: MailService) {}

   @UseInterceptors(RemoveOffreCvTransfertInterceptor)
   @Mutation(() => Boolean)
   async sendEmailPostulerOffre(
      @Args('createMailPostulerOffreInput') createMailPostulerOffreInput: CreateMailPostulerOffreInput,
      @Args('file', { type: () => GraphQLUpload }) { createReadStream, filename }: FileUpload,
      @Args('file2', { type: () => GraphQLUpload })
      { createReadStream: readStream, filename: filename2 }: FileUpload,
   ) {
      const fileCv = await uploadFile(pathUploadsOffreCvTransfert, filename, createReadStream);
      const fileLettre = await uploadFile(pathUploadsOffreCvTransfert, filename2, readStream);
      return this.mailService.sendEmailPostulerOffre(createMailPostulerOffreInput, fileCv, fileLettre);
   }

   @Mutation(() => Boolean)
   async sendEmailMentor(@Args('mailMentorInput') mailMentorInput: MailMentorInput) {
      return this.mailService.sendEmailMentor(mailMentorInput);
   }

   @IgnoreJwtGuard()
   // Pour la validation d'un compte par un admin, Destinataire admin
   @Mutation(() => Boolean)
   async sendEmailDemandeCreationAccount(
      @Args('demandeCreationAccountInput') demandeCreationAccountInput: DemandeCreationAccountInput,
   ) {
      return this.mailService.sendEmailDemandeCreationAccount(demandeCreationAccountInput);
   }

   // Quand le compte est validé envoye un email au destinataire
   @Mutation(() => Boolean)
   async sendEmailValidationCreationAccount(
      @Args('validationCreationAccountInput') validationCreationAccountInput: ValidationCreationAccountInput,
   ) {
      return this.mailService.sendEmailValidationCreationAccount(validationCreationAccountInput);
   }

   @Mutation(() => Boolean)
   async sendEmailAfterCreateUser(@Args('creationAccountInput') creationAccountInput: CreationAccountInput) {
      const { nom, prenom, email, password } = creationAccountInput;
      return this.mailService.sendEmailAfterCreateUsers(nom, prenom, email, password);
   }
}
