import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { authGuard } from '../guard/auht.guard';
import CheckRoleGuard from '../guard/check-roles.guard';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ProgramService } from './program.service';

@Controller('program')
@ApiTags('Program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programService.create(createProgramDto);
  }

  // get all prgorams just for admins
  @UseGuards(CheckRoleGuard(['ADMIN']))
  @UseGuards(authGuard(false))
  @Get()
  findAll() {
    return this.programService.findAll();
  }
  // get by group id for filtering
  @UseGuards(CheckRoleGuard(['CLIENT', 'USER', 'ADMIN']))
  @UseGuards(authGuard(false))
  @Get(':groupId')
  async findWithGroupId(@Param('groupId') groupId: number) {
    const program = await this.programService.findByGroupId(groupId);
    if (program.length === 0) {
      throw new HttpException(
        'not programs found for this groups!',
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException({ data: program }, HttpStatus.FOUND);
  }
  // get single program for clients and uesres
  @UseGuards(CheckRoleGuard(['CLIENT', 'USER']))
  @UseGuards(authGuard(false))
  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return this.programService.findOne(+id);
  }
  @UseGuards(CheckRoleGuard(['CLIENT', 'ADMIN']))
  @UseGuards(authGuard(false))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programService.update(+id, updateProgramDto);
  }
  // delete program from database
  @UseGuards(CheckRoleGuard(['CLIENT', 'ADMIN']))
  @UseGuards(authGuard(false))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.programService.remove(+id);
  }
}
