import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { parse } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GenerateUniqueFileNamePipe implements PipeTransform {
   transform(value: FileUpload, metadata: ArgumentMetadata) {
      const { metatype, type, data } = metadata;

      if (type === 'body' && data === 'file') {
         const { filename } = value;
         const { name, ext } = parse(filename);
         const uuidHash = uuidv4();

         // Format for unique name = name + uuid + date now + extension
         value.filename = `${name}${uuidHash}${Date.now()}${ext}`;
      }
      return value;
   }
}
