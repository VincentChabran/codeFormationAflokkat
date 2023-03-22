import { JwtService } from "@nestjs/jwt";
import { DeleteResult, Repository } from "typeorm";
import { CreateUtilisateurInput } from "./dto/create-utilisateur.input";
import { UpdateUtilisateurInput } from "./dto/update-utilisateur.input";
import { Utilisateur } from "./entities/utilisateur.entity";
export declare class UtilisateursService {
    private utilisateursRepository;
    private jwtService;
    constructor(utilisateursRepository: Repository<Utilisateur>, jwtService: JwtService);
    create(createUtilisateurInput: CreateUtilisateurInput): Promise<Utilisateur>;
    findAll(): Promise<Utilisateur[]>;
    findAllDirection(): Promise<Utilisateur[]>;
    findAllDirectionButOne(id: number): Promise<Utilisateur[]>;
    findOne(email: string): Promise<Utilisateur | null>;
    update(id: number, updateUtilisateurInput: UpdateUtilisateurInput): Promise<{
        access_token: string;
        utilisateur: Utilisateur;
    }>;
    removeUtilisateurNotification(id: number, notificationId: number): Promise<Utilisateur | null>;
    remove(id: number): Promise<DeleteResult>;
}
