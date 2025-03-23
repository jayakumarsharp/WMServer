import { Module } from '@nestjs/common';
import { MarketDataService } from './marketdata.service';
import { MarketDataController } from './marketdata.controller';

@Module({
  controllers: [MarketDataController],
  providers: [MarketDataService],
  exports: [MarketDataService],
})
export class MarketDataModule {}
