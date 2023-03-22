import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormationInput } from './dto/create-formation.input';
import { UpdateFormationInput } from './dto/update-formation.input';
import { Formation } from './entities/formation.entity';

@Injectable()
export class FormationService {
   constructor(@InjectRepository(Formation) private formationRepository: Repository<Formation>) {}

   async create(createFormationInput: CreateFormationInput): Promise<Formation> {
      const formation = this.formationRepository.create(createFormationInput);
      return await this.formationRepository.save(formation);
   }

   async findAll(): Promise<Formation[]> {
      return await this.formationRepository.find();
   }

   async findOne(id: number): Promise<Formation> {
      return await this.formationRepository.findOneByOrFail({ id });
   }

   async update(id: number, updateFormationInput: UpdateFormationInput): Promise<Formation> {
      await this.formationRepository.update(id, { ...updateFormationInput });
      return await this.formationRepository.findOneBy({ id });
   }

   async remove(id: number): Promise<Formation> {
      const formation = this.formationRepository.findOneByOrFail({ id });
      await this.formationRepository.delete(id);
      return formation;
   }
}
