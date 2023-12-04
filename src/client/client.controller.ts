import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PackagesService } from 'src/admin/packages/packages.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('client')
@ApiTags('Client')
export class ClientController {
  constructor(
    private clientService: ClientService,
    private readonly packageService: PackagesService,
  ) {}

  @Post('/register')
  async create(@Body() createClientDto: CreateClientDto) {
    const { PackageId } = createClientDto;
    const item = await this.packageService.findOne(+PackageId);
    if (!item)
      return new HttpException('package not found', HttpStatus.NOT_FOUND);
    console.log(createClientDto);
    const result = await this.clientService.create(createClientDto);
    if (result)
      throw new HttpException('client Created succuss !', HttpStatus.CREATED);
    throw new HttpException('Forribden', HttpStatus.NOT_FOUND);
  }
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientService.update(+id, updateClientDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
