import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService, PrismaService],
})
export class PackagesModule {}
