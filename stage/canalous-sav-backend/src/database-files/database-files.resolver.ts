import { Inject } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DatabaseFilesService } from "./database-files.service";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import DatabaseFile from "./entities/databaseFile.entity";
import { NotificationsService } from "src/notifications/notifications.service";
import { LogsService } from "src/logs/logs.service";
import { PubSubEngine } from "graphql-subscriptions";

interface Participant {
   id: number;
}
@Resolver()
export class DatabaseFilesResolver {
   constructor(
      private readonly databaseFilesService: DatabaseFilesService,
      private readonly notificationsService: NotificationsService,
      private readonly logsService: LogsService,
      @Inject("PUB_SUB") private pubSub: PubSubEngine
   ) {}

   @Mutation(() => Boolean)
   async uploadFile(
      @Args("reclamationId") reclamationId: number,
      @Args({ name: "file", type: () => GraphQLUpload })
      file: FileUpload
   ): Promise<boolean> {
      const { createReadStream, filename } = file;
      if (!existsSync(`${process.cwd()}/../files/${reclamationId}`)) {
         mkdirSync(`${process.cwd()}/../files/${reclamationId}`, {
            recursive: true,
         });
      }
      return new Promise(async (resolve, reject) =>
         createReadStream()
            .pipe(createWriteStream(`${process.cwd()}/../files/${reclamationId}/${filename}`))
            .on("finish", async (res: any) => {
               console.log(res);
               const newFile = await this.databaseFilesService.create({
                  filename,
                  reclamationId,
               });

               await this.logsService.create({
                  reclamationId,
                  log: `Ajout du fichier ${filename}`,
               });

               const participants = await (await newFile.reclamation).participants;
               const participantsIds = participants.map(({ id }: Participant) => {
                  return id;
               });

               this.pubSub.publish("refetching", {
                  refetching: { ids: participantsIds },
               });

               for (let i = 0; i < participants.length; i++) {
                  await this.notificationsService.create({
                     notification: `Une pièce jointe a été déposée pour la réclamation #${reclamationId}`,
                     reclamationId: reclamationId,
                     utilisateurId: participants[i].id,
                  });

                  this.pubSub.publish("sendNotification", {
                     sendNotification: { id: participants[i].id },
                  });
               }

               resolve(true);
            })
            .on("error", (err: any) => {
               console.log(err);
               reject(false);
            })
      );
   }

   @Query(() => [DatabaseFile], { name: "databaseFiles" })
   findAll() {
      return this.databaseFilesService.findAll();
   }
}
