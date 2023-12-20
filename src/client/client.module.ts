import { Module } from '@nestjs/common';
import { PackagesService } from 'src/admin/packages/packages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PackagesService, PrismaService],
})
export class ClientModule {}
