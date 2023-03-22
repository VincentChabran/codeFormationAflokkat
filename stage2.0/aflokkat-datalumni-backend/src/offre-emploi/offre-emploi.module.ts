import { Module } from '@nestjs/common';
import { OffreEmploiService } from './offre-emploi.service';
import { OffreEmploiResolver } from './offre-emploi.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffreEmploi } from './entities/offre-emploi.entity';

@Module({
   imports: [TypeOrmModule.forFeature([OffreEmploi])],
   providers: [OffreEmploiResolver, OffreEmploiService],
})
export class OffreEmploiModule {}
