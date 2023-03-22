import { Test, TestingModule } from '@nestjs/testing';
import { RapportsResolver } from './rapports.resolver';
import { RapportsService } from './rapports.service';

describe('RapportsResolver', () => {
  let resolver: RapportsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RapportsResolver, RapportsService],
    }).compile();

    resolver = module.get<RapportsResolver>(RapportsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
