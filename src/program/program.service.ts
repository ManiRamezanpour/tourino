import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}
  async create(createProgramDto: CreateProgramDto) {
    console.log(createProgramDto);
    return 'This action adds a new program';
  }

  async findAll() {
    return await this.prisma.program.findMany();
  }
  async findByGroupId(groupsId: number) {
    console.log(groupsId);

    // return await this.prisma.program.findMany({
    // where: { groupsId: Number(groupsId) },
    // });
    return groupsId;
  }
  async findOne(id: number) {
    return await this.prisma.program.findFirst({ where: { id } });
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    return await this.prisma.program.update({
      where: { id },
      data: updateProgramDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.program.delete({ where: { id } });
  }
}
