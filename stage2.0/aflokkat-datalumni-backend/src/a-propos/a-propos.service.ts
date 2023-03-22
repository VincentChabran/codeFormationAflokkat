import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAPropoInput } from './dto/create-a-propo.input';
import { UpdateAPropoInput } from './dto/update-a-propo.input';
import { APropo } from './entities/a-propo.entity';

@Injectable()
export class AProposService {
   constructor(@InjectRepository(APropo) private aProposRepository: Repository<APropo>) {}
   // create(createAPropoInput: CreateAPropoInput) {
   //    return 'This action adds a new aPropo';
   // }

   // findAll() {
   //    return `This action returns all aPropos`;
   // }

   async findOne(id: number) {
      return await this.aProposRepository.findOneByOrFail({ id });
   }

   async update(id: number, updateAPropoInput: UpdateAPropoInput) {
      const aPropos = await this.aProposRepository.findOneByOrFail({ id });
      return this.aProposRepository.save({ ...aPropos, ...updateAPropoInput });
   }

   // remove(id: number) {
   //    return `This action removes a #${id} aPropo`;
   // }
}
