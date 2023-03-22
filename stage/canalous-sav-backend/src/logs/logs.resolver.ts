import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { LogsService } from "./logs.service";
import { Log } from "./entities/log.entity";
import { CreateLogInput } from "./dto/create-log.input";

@Resolver(() => Log)
export class LogsResolver {
   constructor(private readonly logService: LogsService) {}

   @Mutation(() => Log)
   async createLog(@Args("createLogInput") createLogInput: CreateLogInput) {
      return await this.logService.create(createLogInput);
   }

   @Query(() => [Log], { name: "logs" })
   findAll() {
      return this.logService.findAll();
   }

   @Query(() => Log, { name: "log" })
   findOne(@Args("id", { type: () => Int }) id: number) {
      return this.logService.findOne(id);
   }
}
