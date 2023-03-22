import { Module } from '@nestjs/common';
import { AProposService } from './a-propos.service';
import { AProposResolver } from './a-propos.resolver';
import { APropo } from './entities/a-propo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([APropo])],
   providers: [AProposResolver, AProposService],
})
export class AProposModule {}
