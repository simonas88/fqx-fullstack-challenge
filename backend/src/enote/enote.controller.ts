import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { EnoteService } from "./enote.service";
import { EnoteCoreModel, EnoteEntity } from "./contracts/enote.contracts";

@Controller("enote")
export class EnoteController {
	constructor(private readonly enoteService: EnoteService) {}

  @Post()
	create(@Body() createEnoteDto: EnoteCoreModel): Promise<EnoteEntity> {
		return this.enoteService.create(createEnoteDto);
	}

  @Get()
  findAll(): Promise<Array<EnoteEntity>> {
  	return this.enoteService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<EnoteEntity> {
  	const one = await this.enoteService.findOne(Number(id));
  	if (!one) {
  		throw new HttpException(`no model id=${id}`, HttpStatus.NOT_FOUND);
  	}
  	return one;
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateEnoteDto: EnoteEntity): Promise<EnoteEntity> {
  	return this.enoteService.update(Number(id), updateEnoteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<EnoteEntity> {
  	return this.enoteService.remove(Number(id));
  }
}
