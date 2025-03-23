import { Test, TestingModule } from '@nestjs/testing';
import { MarketdataController } from './marketdata.controller';

describe('MarketdataController', () => {
  let controller: MarketdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketdataController],
    }).compile();

    controller = module.get<MarketdataController>(MarketdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
