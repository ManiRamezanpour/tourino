import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto) {
    return await this.prisma.news.create({ data: createNewsDto });
  }

  async findAll() {
    return await this.prisma.news.findMany();
  }

  async findOne(id: number) {
    const data = await this.prisma.news.findFirst({ where: { id } });
    return data;
  }

  async update(id: number) {
    return `heelo owlrd ${id}`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
