import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(groupCodes: string, id: number) {
    const data: Prisma.GroupsCreateInput = {
      name: '',
      description: '',
      groupCodes,
      clientsId: id,
      image: '',
    };
    return await this.prisma.groups.create({ data });
  }

  findAll() {
    return `This action returns all groups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  // update(id: number, updateGroupDto: UpdateGroupDto) {
  //   return `This action updates a #${id} group`;
  // }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
