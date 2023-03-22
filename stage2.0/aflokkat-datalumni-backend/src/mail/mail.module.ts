import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailResolver } from './mail.resolver';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
   imports: [
      MailerModule.forRoot({
         transport: {
            host: 'smtp.sendgrid.net',
            auth: {
               user: 'apikey',
               pass: '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',
            },
         },
         template: {
            dir: join(__dirname, '../mail/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
               strict: true,
            },
         },
      }),
   ],
   providers: [MailResolver, MailService],
   exports: [MailService],
})
export class MailModule {}
