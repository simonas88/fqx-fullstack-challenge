import { Injectable } from "@nestjs/common";
import { CreateEnoteDto } from "./dto/create-enote.dto";
import { EnoteRepository } from "./enote.repository";
import { Enote } from "./entities/enote.entity";

@Injectable()
export class EnoteService {
	constructor(private readonly repository: EnoteRepository) {}

	create(createEnoteDto: CreateEnoteDto) {
		return this.repository.create(createEnoteDto);
	}

	findAll() {
		return this.repository.findAll();
	}

	findOne(id: number) {
		return this.repository.findOne(id);
	}

	update(id: number, updateEnoteDto: Enote) {
		return this.repository.update(id, updateEnoteDto);
	}

	remove(id: number) {
		return this.repository.remove(id);
	}
}
