import { readFile, writeFile } from "fs/promises";
import { Injectable } from "@nestjs/common";
import { Enote } from "./entities/enote.entity";

const REPO_LOCATION =  process.env.NODE_ENV === "test" ? "./database.test.json" : "../database.json";

interface IEnoteRepository {
	create: (enote: Omit<Enote, "id">) => Promise<Enote>;
  findAll: () => Promise<Enote[]>;
  findOne: (id: Enote["id"]) => Promise<Enote>;
  update: (id: Enote["id"], payload: Enote) => Promise<Enote>
  remove: (id: Enote["id"]) => Promise<Enote>;
}

@Injectable()
export class EnoteRepository implements IEnoteRepository {
	private async getAllEnotes () {
		try {
			const fileContents = await readFile(REPO_LOCATION, { encoding: "utf-8" });
			return JSON.parse(fileContents);
		} catch (err) {
			return [];
		}
	}

	private async writeEnotes (allEnotes: Enote[]) {
		await writeFile(REPO_LOCATION, JSON.stringify(allEnotes, null, 2));
	}

	private getNextEnoteId (allEnotes: Enote[]): number {
		let maxId = -1;
		allEnotes.forEach(enote => maxId < enote.id && (maxId = enote.id));
		return ++maxId;
	}

	public async create (enote: Omit<Enote, "id">) {
		const allEnotes = await this.getAllEnotes();
		const newEnote = { ...enote, id: this.getNextEnoteId(allEnotes) };
		allEnotes.push(newEnote);
		await this.writeEnotes(allEnotes);
		return newEnote;
	}

	public async findAll() {
		return this.getAllEnotes();
	}

	public async findOne (id: number) {
		const allEnotes = await this.getAllEnotes();
		return allEnotes.find(enote => enote.id === id);
	}

	public async update (id: number, payload: Enote) {
		if (id !== payload.id) {
			throw Error("incorrect enote id");
		}
		const allEnotes = await this.getAllEnotes();
		const targetEnoteIndex = allEnotes.findIndex(enote => enote.id === id);
		allEnotes.splice(targetEnoteIndex, 1, payload);
		this.writeEnotes(allEnotes);
		return { ...payload };
	}

	public async remove (id: number) {
		const allEnotes = await this.getAllEnotes();
		const targetEnoteIndex = allEnotes.findIndex(enote => enote.id === id);
		const targetEnote = allEnotes[targetEnoteIndex];
		allEnotes.splice(targetEnoteIndex, 1);
		this.writeEnotes(allEnotes);
		return { ...targetEnote };
	}
}
