import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnairesResolver } from './questionnaires.resolver';
import { QuestionnairesService } from './questionnaires.service';

describe('QuestionnairesResolver', () => {
  let resolver: QuestionnairesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionnairesResolver, QuestionnairesService],
    }).compile();

    resolver = module.get<QuestionnairesResolver>(QuestionnairesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
