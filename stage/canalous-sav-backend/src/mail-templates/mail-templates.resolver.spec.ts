import { Test, TestingModule } from '@nestjs/testing';
import { MailTemplatesResolver } from './mail-templates.resolver';
import { MailTemplatesService } from './mail-templates.service';

describe('MailTemplatesResolver', () => {
  let resolver: MailTemplatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailTemplatesResolver, MailTemplatesService],
    }).compile();

    resolver = module.get<MailTemplatesResolver>(MailTemplatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
