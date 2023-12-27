import { Injectable } from '@nestjs/common';
import { Program } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}
  async create(createProgramDto: CreateProgramDto) {
    // return await this.prisma.program.create({ data: { createProgramDto } });
    return createProgramDto;
  }

  async findAll() {
    return await this.prisma.program.findMany();
  }
  async findByGroupId(groupCode: string): Promise<Program[] | null> {
    const singleProgram = await this.prisma.program.findMany({
      where: { groupsCode: groupCode },
    });
    return singleProgram;
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
