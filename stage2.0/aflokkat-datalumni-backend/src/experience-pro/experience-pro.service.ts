import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExperienceProInput } from './dto/create-experience-pro.input';
import { UpdateExperienceProInput } from './dto/update-experience-pro.input';
import { ExperiencePro } from './entities/experience-pro.entity';

@Injectable()
export class ExperienceProService {
   constructor(@InjectRepository(ExperiencePro) private experienceProRepository: Repository<ExperiencePro>) {}

   async create(createExperienceProInput: CreateExperienceProInput): Promise<ExperiencePro> {
      const experiencePro = this.experienceProRepository.create(createExperienceProInput);
      return await this.experienceProRepository.save(experiencePro);
   }

   async findAll(): Promise<ExperiencePro[]> {
      return await this.experienceProRepository.find();
   }

   async findOne(id: number): Promise<ExperiencePro> {
      return await this.experienceProRepository.findOneByOrFail({ id });
   }

   async update(id: number, updateExperienceProInput: UpdateExperienceProInput): Promise<ExperiencePro> {
      await this.experienceProRepository.update(id, { ...updateExperienceProInput });
      return await this.experienceProRepository.findOneBy({ id });
   }

   async remove(id: number): Promise<ExperiencePro> {
      const experiencePro = this.experienceProRepository.findOneByOrFail({ id });
      await this.experienceProRepository.delete(id);
      return experiencePro;
   }
}
