import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { OffreEmploi } from '../../offre-emploi/entities/offre-emploi.entity';
import { pathUploadsOffreLogo } from '../../utils/constant/pathUploads';
import { removeFile } from '../functions/removeFile';

@Injectable()
export class FindOffreRemoveLogoInterceptor implements NestInterceptor {
   constructor(@InjectRepository(OffreEmploi) private offreRepository: Repository<OffreEmploi>) {}

   async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const ctx = GqlExecutionContext.create(context);

      const { offre } = ctx.getArgs();

      const offreBDD = await this.offreRepository.findOneByOrFail({ id: offre.id });
      delete offreBDD.userCreateurId;

      if (offreBDD.pathLogo) removeFile(pathUploadsOffreLogo, offreBDD.pathLogo);

      ctx.getArgs()['offre'] = offreBDD;
      return next.handle();
   }
}
