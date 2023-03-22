import { unlinkSync } from 'fs';
import { pathUploadsProfilImg } from '../../utils/constant/pathUploads';

// For delete picture in upload folder
export const removePictureFile = (pictureName: string): void => {
   try {
      unlinkSync(pathUploadsProfilImg + pictureName);
   } catch (err) {
      console.error(err.message);
   }
};
