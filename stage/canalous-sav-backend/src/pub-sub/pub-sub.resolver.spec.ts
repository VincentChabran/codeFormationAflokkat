import { Test, TestingModule } from '@nestjs/testing';
import { PubSubResolver } from './pub-sub.resolver';

describe('PubSubResolver', () => {
  let resolver: PubSubResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubSubResolver],
    }).compile();

    resolver = module.get<PubSubResolver>(PubSubResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
