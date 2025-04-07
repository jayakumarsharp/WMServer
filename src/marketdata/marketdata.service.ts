import { Injectable, Logger } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';
import { Redis } from 'ioredis';

@Injectable()
export class MarketDataService {
  private readonly redisClient: Redis;
  private readonly logger = new Logger(MarketDataService.name);

  constructor() {
    this.redisClient = new Redis(); // Default Redis connection
  }

  /**
   * Fetch stock price from Yahoo Finance API
   */
  async getStockPrice(symbol: string): Promise<number | null> {
    const cacheKey = `stock:${symbol}`;

    // Check Redis Cache
    const cachedPrice = await this.redisClient.get(cacheKey);
    if (cachedPrice) {
      this.logger.log(`Cache hit for ${symbol}`);
      return parseFloat(cachedPrice);
    }

    try {
      const { regularMarketPrice } = await yahooFinance.quote(symbol);
      if (!regularMarketPrice) throw new Error('Price not found');

      // Store in Redis cache (expires in 1 hour)
      await this.redisClient.setex(
        cacheKey,
        3600,
        regularMarketPrice.toString(),
      );

      return regularMarketPrice;
    } catch (error) {
      this.logger.error(
        `Error fetching stock data for ${symbol}: ${error.message}`,
      );
      return null;
    }
  }

  /**
   * Fetch company details (e.g., name, industry)
   */
  async getCompanyDetails(symbol: string): Promise<any> {
    try {
      const data = await yahooFinance.quoteSummary(symbol, {
        modules: ['assetProfile'],
      });
      return data.assetProfile || null;
    } catch (error) {
      this.logger.error(
        `Error fetching company details for ${symbol}: ${error.message}`,
      );
      return null;
    }
  }

  /**
   * Search for securities using Yahoo Finance API
   */
  async searchSecurities(query: string): Promise<any[]> {
    try {
      const results = await yahooFinance.search(query);
      return results.quotes || [];
    } catch (error) {
      this.logger.error(`Error searching securities: ${error.message}`);
      return [];
    }
  }
}
