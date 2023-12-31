import { Injectable } from '@nestjs/common';
import { ProgramsRegisterationStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}
  async create(createProgramDto: CreateProgramDto) {
    const data: CreateProgramDto = createProgramDto;
    data.groupsCode = createProgramDto.groupsCode;
    // return await this.prisma.program.create({ data });
  }

  async findAll() {
    return await this.prisma.program.findMany();
  }
  async findByGroupId(groupCode: string) {
    const singleProgram = await this.prisma.program.findMany({
      where: { groupsCode: groupCode },
    });
    return singleProgram;
  }
  async findOne(id: number) {
    return await this.prisma.program.findFirst({ where: { id } });
  }

  // async update(id: number, updateProgramDto: UpdateProgramDto) {
  //   return await this.prisma.program.update({
  //     where: { id },
  //     data: updateProgramDto,
  //   });
  // }

  async remove(id: number) {
    return await this.prisma.program.delete({ where: { id } });
  }

  async userRegisterForProgram(
    userId: number,
    programId: number,
    groupsCode: string,
  ) {
    return await this.prisma.programRegisters.create({
      data: {
        userId,
        programId: +programId,
        groupsCode,
        status: ProgramsRegisterationStatus.NOTPAYED,
      },
    });
  }
  async findUserPrograms(userId: number) {
    return await this.prisma.programRegisters.findMany({ where: { userId } });
  }
}
