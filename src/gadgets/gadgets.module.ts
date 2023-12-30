import { Module } from '@nestjs/common';
import { GadgetsService } from './gadgets.service';
import { GadgetsController } from './gadgets.controller';

@Module({
  controllers: [GadgetsController],
  providers: [GadgetsService],
})
export class GadgetsModule {}
