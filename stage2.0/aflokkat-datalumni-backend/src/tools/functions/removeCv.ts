import { unlinkSync } from 'fs';
import { pathUploadsOffreCvTransfert } from '../../utils/constant/pathUploads';

// For delete cv in upload folder
export const removeCv = (filename: string): void => {
   try {
      unlinkSync(pathUploadsOffreCvTransfert + filename);
   } catch (err) {
      console.error(err.message);
   }
};
