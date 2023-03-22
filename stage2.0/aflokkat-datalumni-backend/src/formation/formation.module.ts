import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationResolver } from './formation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from './entities/formation.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Formation])],
   providers: [FormationResolver, FormationService],
})
export class FormationModule {}
