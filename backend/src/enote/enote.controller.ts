import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { EnoteModel, EnoteSavedModel } from "contracts";
import { EnoteService } from "./enote.service";

@Controller("enote")
export class EnoteController {
	constructor(private readonly enoteService: EnoteService) {}

  @Post()
	create(@Body() createEnoteDto: EnoteModel): Promise<EnoteSavedModel> {
		return this.enoteService.create(createEnoteDto);
	}

  @Get()
  findAll(): Promise<Array<EnoteSavedModel>> {
  	return this.enoteService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<EnoteSavedModel> {
  	return this.enoteService.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEnoteDto: EnoteModel): Promise<EnoteSavedModel> {
  	return this.enoteService.update(Number(id), updateEnoteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<EnoteSavedModel> {
  	return this.enoteService.remove(Number(id));
  }
}
