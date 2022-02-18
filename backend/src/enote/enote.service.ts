import { Injectable } from "@nestjs/common";
import { EnoteRepository } from "./enote.repository";
import { EnoteCoreModel, EnoteEntity } from "./contracts/enote.contracts";

@Injectable()
export class EnoteService {
	constructor(private readonly repository: EnoteRepository) {}

	create(createEnoteDto: EnoteCoreModel) {
		return this.repository.create(createEnoteDto);
	}

	findAll(): Promise<Array<EnoteEntity>> {
		return this.repository.findAll();
	}

	findOne(id: number) {
		return this.repository.findOne(id);
	}

	update(id: number, updateEnoteDto: EnoteEntity) {
		return this.repository.update(id, updateEnoteDto as EnoteEntity);
	}

	remove(id: number) {
		return this.repository.remove(id);
	}
}
