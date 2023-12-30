import { Test, TestingModule } from '@nestjs/testing';
import { GadgetsController } from './gadgets.controller';
import { GadgetsService } from './gadgets.service';

describe('GadgetsController', () => {
  let controller: GadgetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GadgetsController],
      providers: [GadgetsService],
    }).compile();

    controller = module.get<GadgetsController>(GadgetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
