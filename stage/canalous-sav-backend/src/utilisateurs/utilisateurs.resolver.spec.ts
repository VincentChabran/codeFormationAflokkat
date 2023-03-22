import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateursResolver } from './utilisateurs.resolver';
import { UtilisateursService } from './utilisateurs.service';

describe('UtilisateursResolver', () => {
  let resolver: UtilisateursResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilisateursResolver, UtilisateursService],
    }).compile();

    resolver = module.get<UtilisateursResolver>(UtilisateursResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
