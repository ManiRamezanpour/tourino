import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('client')
@ApiTags('Client')
export class ClientController {
  constructor(private clientService: ClientService) {}
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(
      createClientDto,
      createClientDto.packagesId,
    );
  }
  @Get()
  findAll() {
    return this.clientService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
