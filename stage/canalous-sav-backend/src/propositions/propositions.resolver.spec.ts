import { Test, TestingModule } from "@nestjs/testing";
import { PropositionsResolver } from "./propositions.resolver";
import { PropositionsService } from "./propositions.service";

describe("PropositionResolver", () => {
  let resolver: PropositionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropositionsResolver, PropositionsService],
    }).compile();

    resolver = module.get<PropositionsResolver>(PropositionsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
