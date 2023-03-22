import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IGNORE_JWT_GUARD_KEY } from '../utils/decorator/IgnoreJwtGuard.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   constructor(private reflector: Reflector) {
      super();
   }

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const isIgnore = this.reflector.getAllAndOverride<boolean>(IGNORE_JWT_GUARD_KEY, [
         context.getHandler(),
         context.getClass(),
      ]);
      if (isIgnore) {
         return true;
      }
      return super.canActivate(context);
   }

   // handleRequest(err: any, user: any, info: any, context: any, status: any) {
   //    // console.log('errorGuard', err);
   //    // console.log(user);
   //    console.log(info);
   //    console.log(context);

   //    if (err || !user) {
   //       throw new UnauthorizedException();
   //    }
   //    return user;
   // }

   getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
   }
}
