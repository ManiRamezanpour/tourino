import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
type userRegisterDto = {
  mobile: string;
  fullname: string;
  status: string;
};
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(mobile: string) {
    const user = await this.prisma.user.findFirst({
      where: { mobile: mobile },
    });
    return user;
  }
  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    return user;
  }
  async createUser(dto: userRegisterDto) {
    console.log(typeof dto.mobile);
    const checkUser = await this.prisma.user.findFirst({
      where: { mobile: dto.mobile },
    });
    console.log(checkUser);
    if (checkUser) {
      throw new HttpException(
        'your mobile is used before',
        HttpStatus.CONFLICT,
      );
    }
    const data = {
      fullname: dto.fullname,
      mobile: dto.mobile,
      otp: dto.status,
      status: 'not_verified',
      gender: '',
      nationalCode: '',
      birthday: '',
      city: '',
      fatherName: '',
      bloodCategory: '',
      specialIllness: '',
      emergencyMobile: '',
      image: '',
    };
    const user = this.prisma.user.create({
      data,
    });
    if (!user) return null;
    return user;
  }
  async getUserProfile(id: number) {
    const user = this.prisma.user.findFirst({ where: { id } });
    return user;
  }
  async updateUserProfile(id: number, data: User) {
    return await this.prisma.user.update({ where: { id }, data });
  }
  async getListOfMyTeam(id: number) {
    const team = await this.prisma.team.findMany({ where: { userId: id } });
    return team;
  }
  async addnewTeam(id: number, data: any) {
    data.userId = id;
    const team = await this.prisma.team.create({ data });
    if (team) {
      throw new HttpException('team created succuss !', HttpStatus.CREATED);
    }
    throw new HttpException('message', HttpStatus.BAD_REQUEST);
  }
  async addUserGroup(groupCode: string, userId: number) {
    const group = this.prisma.clients.findFirst({
      where: { groupCodes: groupCode },
    });
    if (!group)
      throw new HttpException('Not group found !', HttpStatus.NOT_FOUND);
    const currentUserGrpoups = this.prisma.user.findFirst({
      where: { id: userId },
    });
    return this.prisma.user.update({
      where: { id: userId },
      data: { Groups: [...(await currentUserGrpoups).Groups, groupCode] },
    });
  }
  async findAllGadgets(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    console.log(user);
    return user;
  }
  async createUserGadgets(id: number, data: string) {
    const currentUserGadgets = this.prisma.user.findFirst({
      where: { id },
    });
    const user = await this.prisma.user.update({
      where: { id },
      data: { myGadgets: [...(await currentUserGadgets).myGadgets, data] },
    });
    return user;
  }
  async addUserFavoriteProgram(id: number, programId: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    await this.prisma.userFavoritesPrograms.create({
      data: {
        userId: id,
        programId,
      },
    });
    const program = await this.prisma.program.findFirst({
      where: { id: programId },
    });
    return program;
  }
  async findUserFavoriteProgram(id: number) {
    const user = await this.prisma.userFavoritesPrograms.findMany({
      where: { userId: id },
    });
    const programs = [];
    for (let i = 0; i < user.length; i++) {
      const program = await this.prisma.program.findFirst({
        where: { id: user[i].programId },
      });
      programs.push(program);
    }
    console.log(programs);
    return programs;
  }
}
