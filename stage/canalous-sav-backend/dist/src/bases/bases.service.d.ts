import { Repository } from "typeorm";
import { CreateBaseInput } from "./dto/create-base.input";
import { UpdateBaseInput } from "./dto/update-base.input";
import { Base } from "./entities/base.entity";
export declare class BasesService {
    private basesRepository;
    constructor(basesRepository: Repository<Base>);
    create(createBaseInput: CreateBaseInput): Promise<Base>;
    findAll(): Promise<Base[]>;
    findAllWithIds(ids: number[]): Promise<Base[]>;
    findOne(id: number): Promise<Base | null>;
    update(id: number, updateBaseInput: UpdateBaseInput): Promise<Base | null>;
    remove(id: number): Promise<string>;
}
