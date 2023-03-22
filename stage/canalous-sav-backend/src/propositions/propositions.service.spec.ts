import { Test, TestingModule } from "@nestjs/testing";
import { PropositionsService } from "./propositions.service";

describe("PropositionService", () => {
  let service: PropositionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropositionsService],
    }).compile();

    service = module.get<PropositionsService>(PropositionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
