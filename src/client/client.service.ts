import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Stats } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/Helpers';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(readonly prisma: PrismaService) {}
  async create(clientData: CreateClientDto, packageId: number) {
    const packages = await this.prisma.packages.findFirst({
      where: { id: packageId },
    });
    if (!packages)
      throw new HttpException('Package not found', HttpStatus.NOT_FOUND);
    const db = {
      packagesId: packageId,
      company_name: clientData.company_name,
      company_logo: '',
      province: clientData.province,
      city: clientData.city,
      Address: '',
      Phones: '',
      Socials: [''],
      website: '',
      cto_name: clientData.cto_name,
      cto_nationCode: clientData.cto_nationCode,
      cto_birthday: '',
      cto_phone: clientData.cto_phone,
      cto_fatherName: '',
      accountStatus: Stats.NOTACTIVE,
      email: clientData.email,
      username: clientData.username,
      password: clientData.password,
      groupName: '',
      description: '',
      groupStatus: Stats.ACTIVE,
      groupCodes: clientData.groupCode,
    };
    const client = await this.prisma.clients.create({ data: db });
    return client;
  }
  async completeProfile(id: number) {
    const compeletion = {
      username: 'manirmp',
      password: 'manirmp',
      groupCode: 1214,
    };
    const client = await this.prisma.clients.findFirst({ where: { id } });
    client.username = compeletion.username;
    client.password = await hashPassword(compeletion.password);
    // await this.prisma.clients.update({ where: { id }, data: { client } });
  }
  async findAll() {
    return `This action returns all client`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  async update(id: number) {
    return `This action updates a #${id} client`;
  }

  async remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
