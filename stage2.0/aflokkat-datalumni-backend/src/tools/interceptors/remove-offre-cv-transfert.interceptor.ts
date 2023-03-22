import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { removeCv } from '../functions/removeCv';

@Injectable()
export class RemoveOffreCvTransfertInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
         tap((response) => {
            if (response.send) removeCv(response.filenameCv);
            if (response.send) removeCv(response.filenameLettre);
         }),
      );
   }
}
