import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { pathUploadsOffreCvTransfert } from '../utils/constant/pathUploads';
import { CreateMailPostulerOffreInput } from './dto/create-mail-postuler-offre.input';
import { DemandeCreationAccountInput } from './dto/demande-creation-account-input';
import { MailMentorInput } from './dto/mail-mentor.input';
import { ValidationCreationAccountInput } from './dto/validation-creation-account-input';

@Injectable()
export class MailService {
   constructor(private mailerService: MailerService) {}

   async sendEmailPostulerOffre(
      { nomDuPoste, destinataire, nom, prenom, email, message }: CreateMailPostulerOffreInput,
      filenameCv: string,
      filenameLettre: string,
   ) {
      const res = await this.mailerService.sendMail({
         to: destinataire,
         from: process.env.MAIL_FROM,
         subject: `Candidature pour "${nomDuPoste}"`,
         template: 'candidatureOffre',
         context: {
            nom,
            prenom,
            email,
            message,
         },
         attachments: [
            {
               filename: filenameCv,
               path: join(pathUploadsOffreCvTransfert, filenameCv),
            },
            {
               filename: filenameLettre,
               path: join(pathUploadsOffreCvTransfert, filenameLettre),
            },
         ],
      });
      return { send: res.response.includes('250'), filenameCv, filenameLettre };
   }

   async sendEmailMentor({ to, objet, nom, prenom, email, description }: MailMentorInput) {
      const res = await this.mailerService.sendMail({
         to,
         from: process.env.MAIL_FROM,
         subject: objet,
         template: 'emailMentor',
         context: {
            nom,
            prenom,
            email,
            description,
         },
      });
      return res.response.includes('250');
   }

   // quand l'utilsatuer fait une demande de création de compte
   async sendEmailDemandeCreationAccount({ nom, prenom, email }: DemandeCreationAccountInput) {
      const res = await this.mailerService.sendMail({
         to: process.env.MAIL_ADMIN,
         from: process.env.MAIL_FROM,
         subject: 'Demmande de création de compte',
         template: 'demmandeCreationAccount',
         context: {
            nom,
            prenom,
            email,
         },
      });
      return res.response.includes('250');
   }

   // quand l'admin valide ou pas le compte de l'utilisateur
   async sendEmailValidationCreationAccount({ nom, prenom, emailContact, status }: ValidationCreationAccountInput) {
      const res = await this.mailerService.sendMail({
         to: process.env.MAIL_ADMIN ?? emailContact,
         from: process.env.MAIL_FROM,
         subject: 'Demmande de création de compte',
         template: status === 'valide' ? 'validationCreationAccount' : 'refusCreationAccount',
         context: {
            nom,
            prenom,
            domaine: process.env.DOMAINE_FRONT,
         },
      });
      return res.response.includes('250');
   }

   async sendEmailAfterCreateUsers(nom: string, prenom: string, email: string, password: string) {
      const res = await this.mailerService.sendMail({
         to: process.env.MAIL_ADMIN ?? email,
         from: process.env.MAIL_FROM,
         subject: 'Création de compte',
         template: 'afterCreateUsers',
         context: {
            nom,
            prenom,
            password,
            email,
            domaine: process.env.DOMAINE_FRONT,
         },
      });
      return res.response.includes('250');
   }
}
