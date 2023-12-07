import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}
  create(createProgramDto: CreateProgramDto) {
    console.log(createProgramDto);
    return 'This action adds a new program';
  }

  async findAll() {
    return await this.prisma.program.findMany();
  }
  findByGroupId(groupsId: number) {
    return this.prisma.program.findMany({ where: { groupsId } });
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
