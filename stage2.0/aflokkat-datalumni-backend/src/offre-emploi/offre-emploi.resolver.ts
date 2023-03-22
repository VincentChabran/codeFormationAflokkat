import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OffreEmploiService } from './offre-emploi.service';
import { OffreEmploi } from './entities/offre-emploi.entity';
import { CreateOffreEmploiInput } from './dto/create-offre-emploi.input';
import { UpdateOffreEmploiInput } from './dto/update-offre-emploi.input';
import { uploadFile } from '../tools/functions/uploadFile';
import { pathUploadsOffreLogo } from '../utils/constant/pathUploads';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GenerateUniqueFileNamePipe } from '../tools/pipes/generate-unique-file-name.pipe';
import { UseInterceptors } from '@nestjs/common';
import { FindOffreRemoveLogoInterceptor } from '../tools/interceptors/find-offre-remove-logo.interceptor';

@Resolver(() => OffreEmploi)
export class OffreEmploiResolver {
   constructor(private readonly offreEmploiService: OffreEmploiService) {}

   @Mutation(() => OffreEmploi)
   createOffreEmploi(
      @Args('createOffreEmploiInput') createOffreEmploiInput: CreateOffreEmploiInput,
      @Args('file', { type: () => GraphQLUpload }, GenerateUniqueFileNamePipe) { createReadStream, filename }: FileUpload,
   ) {
      uploadFile(pathUploadsOffreLogo, filename, createReadStream);
      return this.offreEmploiService.create(createOffreEmploiInput, filename);
   }

   @Query(() => [OffreEmploi], { name: 'offreEmploiAll' })
   findAll() {
      return this.offreEmploiService.findAll();
   }

   @Query(() => OffreEmploi, { name: 'offreEmploi' })
   findOne(@Args('id', { type: () => Int }) id: number) {
      return this.offreEmploiService.findOne(id);
   }

   @Mutation(() => OffreEmploi)
   updateOffreEmploi(@Args('updateOffreEmploiInput') updateOffreEmploiInput: UpdateOffreEmploiInput) {
      return this.offreEmploiService.update(updateOffreEmploiInput.id, updateOffreEmploiInput);
   }

   @UseInterceptors(FindOffreRemoveLogoInterceptor)
   @Mutation(() => String)
   async uploadOffreLogo(
      @Args('offre') offre: UpdateOffreEmploiInput,
      @Args('file', { type: () => GraphQLUpload }, GenerateUniqueFileNamePipe) { createReadStream, filename }: FileUpload,
   ): Promise<string> {
      await this.offreEmploiService.updateOffreLogoName(filename, offre);
      return uploadFile(pathUploadsOffreLogo, filename, createReadStream);
   }

   @UseInterceptors(FindOffreRemoveLogoInterceptor)
   @Mutation(() => Boolean)
   removeOffreEmploi(@Args('offre') offre: UpdateOffreEmploiInput) {
      return this.offreEmploiService.remove(offre);
   }
}
