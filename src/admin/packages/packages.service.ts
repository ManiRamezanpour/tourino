import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class PackagesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPackageDto: CreatePackageDto) {
    // TODO : need check user type
    const packages = await this.prisma.packages.create({
      data: createPackageDto,
    });
    console.log(packages);
    if (packages) return new HttpException(packages, HttpStatus.CREATED);
    return 'This action adds a new package';
  }

  async findAll() {
    return await this.prisma.packages.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.packages.findFirst({ where: { id } });
  }

  update(id: number) {
    return `This action updates a #${id} package`;
  }

  async remove(id: number) {
    const remove = await this.prisma.packages.delete({ where: { id } });
    if (remove) return remove;
  }
}
