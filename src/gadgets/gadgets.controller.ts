import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GadgetsService } from './gadgets.service';

@Controller('gadgets')
export class GadgetsController {
  constructor(private readonly gadgetsService: GadgetsService) {}

  @Post()
  create() {
    // return this.gadgetsService.create(createGadgetDto);
  }

  @Get()
  findAll() {
    return this.gadgetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gadgetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.gadgetsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gadgetsService.remove(+id);
  }
}
