import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IGNORE_JWTGUARD_KEY } from "../utils/ignoreJwtGuard-decorateur";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
   constructor(private reflector: Reflector) {
      super();
   }

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      // pour quand on rend le guard global pour qu'il ignore les routes avec le @IgnoreJwtGuard()
      const isIgnore = this.reflector.getAllAndOverride<boolean>(IGNORE_JWTGUARD_KEY, [
         context.getHandler(),
         context.getClass(),
      ]);
      if (isIgnore) {
         return true;
      }
      // ******************************************************************************
      return super.canActivate(context);
   }

   getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
   }
}
@Injectable()
export class JwtAuthGuardRest extends AuthGuard("jwt") {}
