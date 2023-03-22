import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';
import { removeBlogImg } from '../functions/removeBlogImg';

@Injectable()
export class FindBlogRemoveBlogImgInterceptor implements NestInterceptor {
   constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) {}

   async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const ctx = GqlExecutionContext.create(context);

      const { blog } = ctx.getArgs();

      const blogBDD = await this.blogRepository.findOneByOrFail({ id: blog.id });
      delete blogBDD.userCreateurId;

      if (blogBDD.pathImg) removeBlogImg(blogBDD.pathImg);

      ctx.getArgs()['blog'] = blogBDD;
      return next.handle();
   }
}
