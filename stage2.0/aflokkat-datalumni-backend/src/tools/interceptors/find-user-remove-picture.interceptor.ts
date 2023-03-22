import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { removePictureFile } from '../functions/removePictureFile';

@Injectable()
export class FindUserRemovePictureInterceptor implements NestInterceptor {
   constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

   async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const ctx = GqlExecutionContext.create(context);

      const { user } = ctx.getArgs();

      const userBDD = await this.userRepository.findOneByOrFail({ id: user.id });

      if (userBDD.profilPictureName) removePictureFile(userBDD.profilPictureName);

      ctx.getArgs()['user'] = userBDD;

      return next.handle();
   }
}
