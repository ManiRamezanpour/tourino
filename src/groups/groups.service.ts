import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(groupCodes: string, id: number) {
    console.log(id);
    const data = {
      name: '',
      description: '',
      groupCodes,
      clientId: id,
      image: '',
    };
    return await this.prisma.groups.create({ data });
  }

  async findAll() {
    return await this.prisma.groups.findMany();
    return `This action returns all groups`;
  }

  async findByUserId(userId: number) {
    return await this.prisma.userGroups.findMany({ where: { userId: userId } });
  }
  async findByGroupCodes(groupCodes: string) {
    return await this.prisma.groups.findFirst({ where: { groupCodes } });
  }
  async findOne(id: number) {
    return await this.prisma.groups.findFirst({ where: { id } });
  }
  async addUserGroup(groupCodes: string, userId: number) {
    const group = await this.prisma.groups.findFirst({
      where: { groupCodes: '2312312' },
    });
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.userGroups.create({
      data: {
        userId,
        groupsId: group.id,
      },
    });
  }
  // async checkUserInGroup(groupCodes: string, userId: number) {}
}