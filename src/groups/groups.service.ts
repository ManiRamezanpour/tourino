import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}
  // create a new group
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

  // get all groups
  async findAll() {
    return await this.prisma.groups.findMany();
    return `This action returns all groups`;
  }

  async findByUserId(userId: number) {
    return await this.prisma.user.findFirst({ where: { id: userId } });
  }
  async findByGroupCodes(groupCodes: string) {
    return await this.prisma.groups.findFirst({ where: { groupCodes } });
  }
  async findOne(id: number) {
    return await this.prisma.groups.findFirst({ where: { id } });
  }
  async addUserGroup(groupCodes: string, userId: number) {
    console.log(groupCodes);
    const group = await this.prisma.groups.findFirst({
      where: { groupCodes },
    });
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }
    const userOldGroup = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    const updateUserGroups = await this.prisma.user.update({
      where: { id: userId },
      data: {
        Groups: [...userOldGroup.Groups, group.groupCodes],
      },
    });
    return updateUserGroups;
  }
  // async checkUserInGroup(groupCodes: string, userId: number) {}
}
