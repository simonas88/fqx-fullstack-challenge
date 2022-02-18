import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { EnoteModel, EnoteSavedModel } from "contracts";
import { EnoteModelPipe } from "./enote.model.pipe";
import { EnoteService } from "./enote.service";

@Controller("enote")
export class EnoteController {
	constructor(private readonly enoteService: EnoteService) {}

  @Post()
	create(@Body(EnoteModelPipe) createEnoteDto: EnoteModel): Promise<EnoteSavedModel> {
		return this.enoteService.create(createEnoteDto);
	}

  @Get()
  findAll(): Promise<Array<EnoteSavedModel>> {
  	return this.enoteService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<EnoteSavedModel> {
  	const one = await this.enoteService.findOne(Number(id));
  	if (!one) {
  		throw new HttpException(`no model id=${id}`, HttpStatus.NOT_FOUND);
  	}
  	return one;
  }

  @Put(":id")
  update(@Param("id") id: string, @Body(EnoteModelPipe) updateEnoteDto: EnoteModel): Promise<EnoteSavedModel> {
  	return this.enoteService.update(Number(id), updateEnoteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<EnoteSavedModel> {
  	return this.enoteService.remove(Number(id));
  }
}
