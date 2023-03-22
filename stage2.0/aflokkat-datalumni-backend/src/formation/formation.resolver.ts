import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormationService } from './formation.service';
import { Formation } from './entities/formation.entity';
import { CreateFormationInput } from './dto/create-formation.input';
import { UpdateFormationInput } from './dto/update-formation.input';

@Resolver(() => Formation)
export class FormationResolver {
   constructor(private readonly formationService: FormationService) {}

   @Mutation(() => Formation)
   createFormation(@Args('createFormationInput') createFormationInput: CreateFormationInput) {
      return this.formationService.create(createFormationInput);
   }

   @Query(() => [Formation], { name: 'formations' })
   findAll() {
      return this.formationService.findAll();
   }

   @Query(() => Formation, { name: 'formation' })
   findOne(@Args('id', { type: () => Int }) id: number) {
      return this.formationService.findOne(id);
   }

   @Mutation(() => Formation)
   updateFormation(@Args('updateFormationInput') updateFormationInput: UpdateFormationInput) {
      return this.formationService.update(updateFormationInput.id, updateFormationInput);
   }

   @Mutation(() => Formation)
   removeFormation(@Args('id', { type: () => Int }) id: number) {
      return this.formationService.remove(id);
   }
}
