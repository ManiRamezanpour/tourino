import { Injectable } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/Helpers';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groupService: GroupsService,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const data = {
      packagesId: +createClientDto.PackageId,
      company_name: createClientDto.company_name,
      company_logo: '',
      province: createClientDto.province,
      city: createClientDto.city,
      Address: '',
      Phones: '',
      Socials: [''],
      website: '',
      cto_name: createClientDto.cto_name,
      cto_nationCode: createClientDto.cto_nationCode,
      cto_birthday: '',
      cto_phone: createClientDto.cto_phone,
      cto_fatherName: '',
      username: '',
      email: '',
      password: '',
    };
    const { groupCode } = createClientDto;
    const client = await this.prisma.clients.create({ data: data });
    console.log(client.id);
    return await this.groupService.create(groupCode, client.id);
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
