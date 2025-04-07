import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { Holding } from './entities/holding.entity';
import { User } from '../user/entities/user.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { AddHoldingDto } from './dto/add-holding.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,

    @InjectRepository(Holding)
    private readonly holdingRepository: Repository<Holding>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPortfolio(
    userId: number,
    createPortfolioDto: CreatePortfolioDto,
  ): Promise<Portfolio> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const portfolio = this.portfolioRepository.create({
      ...createPortfolioDto,
      user,
    });
    return this.portfolioRepository.save(portfolio);
  }
  
  async updatePortfolio(portfolioId: number, updateDto: UpdatePortfolioDto): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({ where: { id: portfolioId } });
    if (!portfolio) throw new NotFoundException('Portfolio not found');
    if (updateDto.name) {
      portfolio.name = updateDto.name;
    }
    return this.portfolioRepository.save(portfolio);
  }

  async getUserPortfolios(userId: number): Promise<Portfolio[]> {
    return this.portfolioRepository.find({
      where: { user: { id: userId } },
      relations: ['holdings'],
    });
  }

  async addHolding(
    portfolioId: number,
    addHoldingDto: AddHoldingDto,
  ): Promise<Holding> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id: portfolioId },
    });
    if (!portfolio) throw new NotFoundException('Portfolio not found');

    const holding = this.holdingRepository.create({
      ...addHoldingDto,
      portfolio,
    });
    return this.holdingRepository.save(holding);
  }

  async deletePortfolio(portfolioId: number): Promise<void> {
    const result = await this.portfolioRepository.delete(portfolioId);
    if (result.affected === 0)
      throw new NotFoundException('Portfolio not found');
  }
}
