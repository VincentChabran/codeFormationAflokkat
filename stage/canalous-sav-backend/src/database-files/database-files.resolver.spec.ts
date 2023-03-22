import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseFilesResolver } from './database-files.resolver';
import { DatabaseFilesService } from './database-files.service';

describe('DatabaseFilesResolver', () => {
  let resolver: DatabaseFilesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseFilesResolver, DatabaseFilesService],
    }).compile();

    resolver = module.get<DatabaseFilesResolver>(DatabaseFilesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
