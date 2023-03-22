import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInput } from '../../user/dto/create-user.input';

@Injectable()
export class EncodePasswordPipe implements PipeTransform {
   async transform(value: CreateUserInput, metadata: ArgumentMetadata) {
      const { metatype, type, data } = metadata;

      if (type === 'body' && (data === 'singupUserInput' || data === 'createUserInput')) {
         value.password = await hash(value.password, 10);
      }

      return value;
   }
}
