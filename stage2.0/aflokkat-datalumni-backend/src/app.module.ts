import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './utils/ormConfig';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { FormationModule } from './formation/formation.module';
import { ExperienceProModule } from './experience-pro/experience-pro.module';
import { OffreEmploiModule } from './offre-emploi/offre-emploi.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MailModule } from './mail/mail.module';
import { BlogModule } from './blog/blog.module';
import { AProposModule } from './a-propos/a-propos.module';

@Module({
   imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
         driver: ApolloDriver,
         autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
         playground: false,
         plugins: [ApolloServerPluginLandingPageLocalDefault()],
      }),
      TypeOrmModule.forRoot(ormConfig),
      UserModule,
      FormationModule,
      ExperienceProModule,
      OffreEmploiModule,
      AuthModule,
      MailModule,
      BlogModule,
      AProposModule,
   ],
   controllers: [],
   providers: [
      {
         provide: APP_GUARD,
         useClass: JwtAuthGuard,
      },
   ],
})
export class AppModule {}
