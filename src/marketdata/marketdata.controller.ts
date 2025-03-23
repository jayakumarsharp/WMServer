import { Controller, Get, Param } from '@nestjs/common';
import { MarketDataService } from './marketdata.service';

@Controller('marketdata')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  /**
   * Get stock price
   */
  @Get('price/:symbol')
  async getStockPrice(@Param('symbol') symbol: string) {
    const price = await this.marketDataService.getStockPrice(symbol);
    return { symbol, price };
  }

  /**
   * Get company details
   */
  @Get('company/:symbol')
  async getCompanyDetails(@Param('symbol') symbol: string) {
    const companyDetails = await this.marketDataService.getCompanyDetails(symbol);
    return { symbol, companyDetails };
  }
}
