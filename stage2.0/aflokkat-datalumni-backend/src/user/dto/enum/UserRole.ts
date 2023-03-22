import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
   Admin = 'Admin',
   Equipe_administrative = 'Equipe_administrative',
   Recruteur = 'Recruteur',
   Enseignant = 'Enseignant',
   Etudiant = 'Etudiant',
}
registerEnumType(UserRole, { name: 'UserRole' }); // Pour que graphQL reconnaisse l'enum
