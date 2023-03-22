import { unlinkSync } from 'fs';
import { pathUploadsBlogImg } from '../../utils/constant/pathUploads';

// For delete cv in upload folder
export const removeBlogImg = (filename: string): void => {
   try {
      unlinkSync(pathUploadsBlogImg + filename);
   } catch (err) {
      console.error(err.message);
   }
};
