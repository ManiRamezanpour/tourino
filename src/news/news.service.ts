import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}
  create() {
    return 'this action create db';
  }

  findAll() {
    return `This action returns all news`;
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
