import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { AddStockDto } from './dto/add-stock.dto';

@Controller('portfolio/:portfolioId/watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  createWatchlist(
    @Param('portfolioId') portfolioId: number,
    @Body() createWatchlistDto: CreateWatchlistDto,
  ) {
    return this.watchlistService.createWatchlist(
      portfolioId,
      createWatchlistDto,
    );
  }

  @Post(':watchlistId/items')
  addStock(
    @Param('watchlistId') watchlistId: number,
    @Body() addStockDto: AddStockDto,
  ) {
    return this.watchlistService.addStockToWatchlist(watchlistId, addStockDto);
  }

  @Get()
  getPortfolioWatchlists(@Param('portfolioId') portfolioId: number) {
    return this.watchlistService.getPortfolioWatchlists(portfolioId);
  }

  @Delete(':watchlistId')
  deleteWatchlist(@Param('watchlistId') watchlistId: number) {
    return this.watchlistService.deleteWatchlist(watchlistId);
  }
}
