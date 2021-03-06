import { readFile, writeFile } from "fs/promises";
import { Injectable } from "@nestjs/common";
import { EnoteCoreModel, EnoteEntity } from "./contracts/enote.contracts";

const REPO_LOCATION =  process.env.NODE_ENV === "test" ? "./database.test.json" : "../database.json";

@Injectable()
export class EnoteRepository {
	private async getAllEnotes (): Promise<EnoteEntity[]> {
		try {
			const fileContents = await readFile(REPO_LOCATION, { encoding: "utf-8" });
			return JSON.parse(fileContents);
		} catch (err) {
			return [];
		}
	}

	private async writeEnotes (allEnotes: EnoteEntity[]): Promise<void> {
		await writeFile(REPO_LOCATION, JSON.stringify(allEnotes, null, 2));
	}

	private getNextEnoteId (allEnotes: EnoteEntity[]): number {
		let maxId = -1;
		allEnotes.forEach(enote => maxId < enote.id && (maxId = enote.id));
		return ++maxId;
	}

	public async create (enote: EnoteCoreModel): Promise<EnoteEntity> {
		const allEnotes = await this.getAllEnotes();
		const newEnote = { ...enote, id: this.getNextEnoteId(allEnotes) };
		allEnotes.push(newEnote);
		await this.writeEnotes(allEnotes);
		return newEnote;
	}

	public async findAll () {
		return this.getAllEnotes();
	}

	public async findOne (id: number): Promise<EnoteEntity | undefined> {
		const allEnotes = await this.getAllEnotes();
		return allEnotes.find(enote => enote.id === id);
	}

	public async update (id: number, payload: EnoteEntity): Promise<EnoteEntity> {
		if (id !== payload.id) {
			throw Error("incorrect enote id");
		}
		const allEnotes = await this.getAllEnotes();
		const targetEnoteIndex = allEnotes.findIndex(enote => enote.id === id);
		allEnotes.splice(targetEnoteIndex, 1, payload);
		this.writeEnotes(allEnotes);
		return { ...payload };
	}

	public async remove (id: number): Promise<EnoteEntity> {
		const allEnotes = await this.getAllEnotes();
		const targetEnoteIndex = allEnotes.findIndex(enote => enote.id === id);
		const targetEnote = allEnotes[targetEnoteIndex];
		allEnotes.splice(targetEnoteIndex, 1);
		this.writeEnotes(allEnotes);
		return { ...targetEnote };
	}
}
