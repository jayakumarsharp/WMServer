import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { WatchlistItem } from './entities/watchlist-item.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { AddStockDto } from './dto/add-stock.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist) private watchlistRepo: Repository<Watchlist>,
    @InjectRepository(WatchlistItem)
    private watchlistItemRepo: Repository<WatchlistItem>,
    @InjectRepository(Portfolio) private portfolioRepo: Repository<Portfolio>,
  ) {}

  async createWatchlist(
    portfolioId: number,
    createWatchlistDto: CreateWatchlistDto,
  ): Promise<Watchlist> {
    const portfolio = await this.portfolioRepo.findOne({
      where: { id: portfolioId },
    });
    if (!portfolio) throw new NotFoundException('Portfolio not found');

    const watchlist = this.watchlistRepo.create({
      ...createWatchlistDto,
      portfolio,
    });
    return this.watchlistRepo.save(watchlist);
  }

  async addStockToWatchlist(
    watchlistId: number,
    addStockDto: AddStockDto,
  ): Promise<WatchlistItem> {
    const watchlist = await this.watchlistRepo.findOne({
      where: { id: watchlistId },
    });
    if (!watchlist) throw new NotFoundException('Watchlist not found');

    const item = this.watchlistItemRepo.create({ ...addStockDto, watchlist });
    return this.watchlistItemRepo.save(item);
  }

  async getPortfolioWatchlists(portfolioId: number): Promise<Watchlist[]> {
    return this.watchlistRepo.find({
      where: { portfolio: { id: portfolioId } },
      relations: ['items'],
    });
  }

  async deleteWatchlist(watchlistId: number): Promise<void> {
    await this.watchlistRepo.delete(watchlistId);
  }
}
