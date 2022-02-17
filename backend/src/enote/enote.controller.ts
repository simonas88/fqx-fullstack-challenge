import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { EnoteService } from "./enote.service";
import { CreateEnoteDto } from "./dto/create-enote.dto";
import { Enote } from "./entities/enote.entity";

@Controller("enote")
export class EnoteController {
	constructor(private readonly enoteService: EnoteService) {}

  @Post()
	create(@Body() createEnoteDto: CreateEnoteDto) {
		return this.enoteService.create(createEnoteDto);
	}

  @Get()
  findAll() {
  	return this.enoteService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
  	return this.enoteService.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEnoteDto: Enote) {
  	return this.enoteService.update(Number(id), updateEnoteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
  	return this.enoteService.remove(Number(id));
  }
}
