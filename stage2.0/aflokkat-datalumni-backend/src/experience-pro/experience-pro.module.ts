import { Module } from '@nestjs/common';
import { ExperienceProService } from './experience-pro.service';
import { ExperienceProResolver } from './experience-pro.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperiencePro } from './entities/experience-pro.entity';

@Module({
   imports: [TypeOrmModule.forFeature([ExperiencePro])],
   providers: [ExperienceProResolver, ExperienceProService],
})
export class ExperienceProModule {}
