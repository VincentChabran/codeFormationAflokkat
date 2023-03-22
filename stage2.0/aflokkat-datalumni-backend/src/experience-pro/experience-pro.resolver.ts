import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExperienceProService } from './experience-pro.service';
import { ExperiencePro } from './entities/experience-pro.entity';
import { CreateExperienceProInput } from './dto/create-experience-pro.input';
import { UpdateExperienceProInput } from './dto/update-experience-pro.input';

@Resolver(() => ExperiencePro)
export class ExperienceProResolver {
   constructor(private readonly experienceProService: ExperienceProService) {}

   @Mutation(() => ExperiencePro)
   createExperiencePro(@Args('createExperienceProInput') createExperienceProInput: CreateExperienceProInput) {
      return this.experienceProService.create(createExperienceProInput);
   }

   @Query(() => [ExperiencePro], { name: 'experiencePros' })
   findAll() {
      return this.experienceProService.findAll();
   }

   @Query(() => ExperiencePro, { name: 'experiencePro' })
   findOne(@Args('id', { type: () => Int }) id: number) {
      return this.experienceProService.findOne(id);
   }

   @Mutation(() => ExperiencePro)
   updateExperiencePro(@Args('updateExperienceProInput') updateExperienceProInput: UpdateExperienceProInput) {
      return this.experienceProService.update(updateExperienceProInput.id, updateExperienceProInput);
   }

   @Mutation(() => ExperiencePro)
   removeExperiencePro(@Args('id', { type: () => Int }) id: number) {
      return this.experienceProService.remove(id);
   }
}
