import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';

@Module({
  controllers: [BonusController],
  providers: [BonusService, PrismaService],
})
export class BonusModule {}
