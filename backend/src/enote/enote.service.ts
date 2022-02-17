import { Injectable } from "@nestjs/common";
import { EnoteModel, EnoteSavedModel } from "contracts";
import { EnoteRepository } from "./enote.repository";
import { EnoteEntity } from "./entities/enote.entity";

@Injectable()
export class EnoteService {
	constructor(private readonly repository: EnoteRepository) {}

	create(createEnoteDto: EnoteModel): Promise<EnoteSavedModel> {
		return this.repository.create(createEnoteDto);
	}

	findAll(): Promise<Array<EnoteSavedModel>> {
		return this.repository.findAll();
	}

	findOne(id: number): Promise<EnoteSavedModel | undefined> {
		return this.repository.findOne(id);
	}

	update(id: number, updateEnoteDto: EnoteModel): Promise<EnoteSavedModel> {
		return this.repository.update(id, updateEnoteDto as EnoteEntity);
	}

	remove(id: number): Promise<EnoteSavedModel> {
		return this.repository.remove(id);
	}
}
