import { BasesService } from "./bases.service";
import { Base } from "./entities/base.entity";
import { CreateBaseInput } from "./dto/create-base.input";
import { UpdateBaseInput } from "./dto/update-base.input";
import { HttpService } from "@nestjs/axios";
import { AuthService } from "src/auth/auth.service";
import { UtilisateursService } from "src/utilisateurs/utilisateurs.service";
export declare class BasesResolver {
    private readonly basesService;
    private readonly utilisateursService;
    private readonly authService;
    private httpService;
    constructor(basesService: BasesService, utilisateursService: UtilisateursService, authService: AuthService, httpService: HttpService);
    createBase(createBaseInput: CreateBaseInput): Promise<Base>;
    SynchronizeBases(): Promise<any>;
    findReservation(param: string): Promise<any>;
    getClientInfos(id: number): Promise<any>;
    findAll(): Promise<Base[]>;
    findOne(id: number): Promise<Base>;
    updateBase(updateBaseInput: UpdateBaseInput): Promise<Base>;
}
