import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOffreEmploiInput } from './dto/create-offre-emploi.input';
import { UpdateOffreEmploiInput } from './dto/update-offre-emploi.input';
import { OffreEmploi } from './entities/offre-emploi.entity';

@Injectable()
export class OffreEmploiService {
   constructor(@InjectRepository(OffreEmploi) private offreEmploiRepositiry: Repository<OffreEmploi>) {}

   async create(createOffreEmploiInput: CreateOffreEmploiInput, filename: string): Promise<OffreEmploi> {
      const offre = this.offreEmploiRepositiry.create(createOffreEmploiInput);
      offre.pathLogo = filename;
      return await this.offreEmploiRepositiry.save(offre);
   }

   async findAll(): Promise<OffreEmploi[]> {
      return await this.offreEmploiRepositiry.find();
   }

   async findOne(id: number): Promise<OffreEmploi> {
      return await this.offreEmploiRepositiry.findOneByOrFail({ id });
   }

   async update(id: number, updateOffreEmploiInput: UpdateOffreEmploiInput): Promise<OffreEmploi> {
      await this.offreEmploiRepositiry.update(id, { ...updateOffreEmploiInput });
      return await this.offreEmploiRepositiry.findOneBy({ id });
   }

   async updateOffreLogoName(logoPictureName: string, offre: UpdateOffreEmploiInput): Promise<void> {
      offre.pathLogo = logoPictureName;
      await this.offreEmploiRepositiry.save(offre);
   }

   async remove(offre: UpdateOffreEmploiInput) {
      await this.offreEmploiRepositiry.delete(offre.id);
      return true;
   }
}
