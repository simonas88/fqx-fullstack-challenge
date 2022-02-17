import { Module } from "@nestjs/common";
import { EnoteService } from "./enote.service";
import { EnoteController } from "./enote.controller";
import { EnoteRepository } from "./enote.repository";

@Module({
	controllers: [EnoteController],
	providers: [EnoteService, EnoteRepository]
})
export class EnoteModule {}
