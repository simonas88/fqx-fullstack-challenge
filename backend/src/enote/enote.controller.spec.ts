import { Test, TestingModule } from "@nestjs/testing";
import { EnoteController } from "./enote.controller";
import { EnoteRepository } from "./enote.repository";
import { EnoteService } from "./enote.service";

describe("EnoteController", () => {
	let controller: EnoteController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EnoteController],
			providers: [EnoteService, EnoteRepository],
		}).compile();

		controller = module.get<EnoteController>(EnoteController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
