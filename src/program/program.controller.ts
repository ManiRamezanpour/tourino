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
import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramService } from './program.service';

@Controller('program')
@ApiTags('Program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programService.create(createProgramDto);
  }
  // just for admins
  @Get()
  findAll() {
    return this.programService.findAll();
  }
  @Get('/group/:groupCode')
  async findWithGroupId(@Param('groupCode') groupCode: string) {
    const program = await this.programService.findByGroupId(groupCode);
    if (program.length === 0) {
      throw new HttpException(
        'not programs found for this groups!',
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException({ data: program }, HttpStatus.FOUND);
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const program = await this.programService.findOne(+id);
    console.log(program);
    if (!program)
      throw new HttpException('Not program found !', HttpStatus.NOT_FOUND);
    throw new HttpException({ data: program }, HttpStatus.FOUND);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
  //   return this.programService.update(+id, updateProgramDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.programService.remove(+id);
  }
}
