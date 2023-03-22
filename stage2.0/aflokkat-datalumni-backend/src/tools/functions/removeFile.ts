import { unlinkSync } from 'fs';

export const removeFile = (pathFolder: string, filename: string): void => {
   try {
      unlinkSync(pathFolder + filename);
   } catch (err) {
      console.error(err.message);
   }
};
