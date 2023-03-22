import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

// Pas Utiliser
@Injectable()
export class UpdateUserIdInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const ctx = GqlExecutionContext.create(context);

      const keys = Object.keys(ctx.getArgs());

      keys.forEach((key) => {
         const { userId, ...rest } = ctx.getArgByIndex(1)[key];
         ctx.getArgs()[key] = rest;
      });
      return next.handle();
   }
}
