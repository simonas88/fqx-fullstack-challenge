import { Test, TestingModule } from "@nestjs/testing";
import { EnoteRepository } from "./enote.repository";
import { EnoteService } from "./enote.service";

describe("EnoteService", () => {
	let service: EnoteService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EnoteService, EnoteRepository],
		}).compile();

		service = module.get<EnoteService>(EnoteService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
