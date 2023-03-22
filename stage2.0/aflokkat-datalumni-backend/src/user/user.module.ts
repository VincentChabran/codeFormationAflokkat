import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
      TypeOrmModule.forFeature([User]),
      MailModule,
      JwtModule.register({
         signOptions: { expiresIn: '10s' },
         secret: process.env.JWT_SECRET,
      }),
   ],
   providers: [UserResolver, UserService],
   exports: [UserService],
})
export class UserModule {}
