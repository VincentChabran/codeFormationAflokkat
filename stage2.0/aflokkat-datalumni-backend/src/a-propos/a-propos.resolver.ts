import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AProposService } from './a-propos.service';
import { APropo } from './entities/a-propo.entity';
import { CreateAPropoInput } from './dto/create-a-propo.input';
import { UpdateAPropoInput } from './dto/update-a-propo.input';

@Resolver(() => APropo)
export class AProposResolver {
   constructor(private readonly aProposService: AProposService) {}

   // @Mutation(() => APropo)
   // createAPropo(@Args('createAPropoInput') createAPropoInput: CreateAPropoInput) {
   //   return this.aProposService.create(createAPropoInput);
   // }

   // @Query(() => [APropo], { name: 'aPropos' })
   // findAll() {
   //    return this.aProposService.findAll();
   // }

   @Query(() => APropo, { name: 'aPropo' })
   findOneById(@Args('id', { type: () => Int }) id: number) {
      return this.aProposService.findOne(id);
   }

   @Mutation(() => APropo)
   updateAPropo(@Args('updateAPropoInput') updateAPropoInput: UpdateAPropoInput) {
      return this.aProposService.update(updateAPropoInput.id, updateAPropoInput);
   }

   // @Mutation(() => APropo)
   // removeAPropo(@Args('id', { type: () => Int }) id: number) {
   //   return this.aProposService.remove(id);
   // }
}
