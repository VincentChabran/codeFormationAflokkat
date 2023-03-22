import { join } from 'path';

const pathUploadFolder: string = join(process.cwd(), process.env.UPLOADS_FOLDER, '/');

// from root Path ./UPLOADS_FOLDER/PROFILIMG_FOLDER/
export const pathUploadsProfilImg: string = join(pathUploadFolder, process.env.PROFILIMG_FOLDER, '/');

export const pathUploadsOffreLogo: string = join(pathUploadFolder, process.env.OFFRE_LOGO_FOLDER, '/');

export const pathUploadsOffreCvTransfert: string = join(pathUploadFolder, process.env.OFFRE_CV_TRANSFERT_FOLDER, '/');

export const pathUploadsBlogImg: string = join(pathUploadFolder, process.env.BLOG_IMG_FOLDER, '/');

export const pathUploadsTemp: string = join(pathUploadFolder, process.env.TEMP_FOLDER, '/');
