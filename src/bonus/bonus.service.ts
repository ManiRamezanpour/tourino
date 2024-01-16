import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';

@Injectable()
export class BonusService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBonusDto: CreateBonusDto) {
    return this.prisma.bonus.create({ data: createBonusDto });
  }

  findAll() {
    return this.prisma.bonus.findMany({});
  }

  findOne(id: number) {
    return this.prisma.bonus.findFirst({ where: { id } });
  }

  update(id: number, updateBonusDto: UpdateBonusDto) {
    return `This action updates a #${id} bonus`;
  }

  remove(id: number) {
    return this.prisma.bonus.delete({ where: { id } });
  }
}
