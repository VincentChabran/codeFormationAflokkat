export interface JwtPayload {
   id: string;
   email: string;
   nom: string;
   prenom: string;
   profilPictureName: string;
   roles: string[];
   mentor: boolean;
}
