import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { EnoteModule } from "./enote/enote.module";

@Module({
	imports: [EnoteModule],
	controllers: [AppController],
})
export class AppModule {}
