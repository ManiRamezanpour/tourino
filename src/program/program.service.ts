import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async remove(id: number) {
    return await this.prisma.program.delete({ where: { id } });
  }

  async userRegisterForProgram(
    userId: number,
    programId: number,
    groupsCode: string,
    userTeamId: number[],
  ) {
    for (let i = 1; i <= userTeamId.length; i++) {
      const checkTeam = this.prisma.team.findFirst({
        where: { id: userTeamId[i] },
      });
      if (!checkTeam)
        throw new HttpException(
          `team id inde ${i} is not valid`,
          HttpStatus.NOT_FOUND,
        );
    }
    //@ts-ignore
    userTeamId = JSON.parse(userTeamId);
    return await this.prisma.programRegisters.create({
      data: {
        userId,
        programId: +programId,
        usersTeamId: userTeamId,
        groupsCode: groupsCode,
        status: ProgramsRegisterationStatus.NOTPAYED,
      },
    });
  }
  async findUserPrograms(userId: number) {
    const userProgram = await this.prisma.programRegisters.findMany({
      where: { userId },
    });
    // for();
    // const userTeam: any[] = userProgram.usersTeamId
    // for (let i = 0; i < userTeam.length; i++) {
    //   const team = await this.prisma.team.findFirst({
    //     where: { id: userTeam[i].id },
    //   });
    //   myTeam.push(team);
    // }
    // //@ts-ignore
    // userProgram.usersTeamId = myTeam;
    return userProgram;
  }
}
