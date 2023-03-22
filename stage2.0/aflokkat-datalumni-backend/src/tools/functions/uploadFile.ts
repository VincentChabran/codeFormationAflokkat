import { createWriteStream, ReadStream } from 'fs';

export const uploadFile = (
   pathUploadFolder: string,
   filename: string,
   createReadStream: () => ReadStream,
): Promise<string> => {
   return new Promise(async (resolve, reject) =>
      createReadStream()
         .pipe(createWriteStream(pathUploadFolder + filename))
         .on('finish', () => resolve(filename))
         .on('error', () => reject(false)),
   );
};
