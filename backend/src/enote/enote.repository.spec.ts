import { readFile, unlink } from "fs/promises";
import { EnoteCoreModel } from "./contracts/enote.contracts";
import { EnoteRepository } from "./enote.repository";

const REPO_LOCATION = "./database.test.json";

const readFilePromise = async () => {
	const content = await readFile(REPO_LOCATION, { encoding: "utf-8" });
	return JSON.parse(content);
};

const TEST_ENOTE: EnoteCoreModel = {
	purchasePrice: 100,
	paymentDate: new Date("2020-01-01").toISOString() as unknown as Date,
	dueDate: new Date("2020-02-01").toISOString() as unknown as Date,
	faceValueKey: "faceValue",
	faceValueValue: 100
};

describe("EnoteRepository", () => {
	beforeAll(async () => {
		try {
			await unlink(REPO_LOCATION);
		} catch (err) {}
	});

	afterAll(async () => {
		await unlink(REPO_LOCATION);
	});

	it("stores enote in json", async () => {
		const repo = new EnoteRepository();
		await repo.create(TEST_ENOTE);
		expect(await readFilePromise()).toEqual([{ ...TEST_ENOTE, id: 0 }]);
	});
});
