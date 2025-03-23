import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { Holding } from './entities/holding.entity';
import { User } from '../user/entities/user.entity';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, Holding, User])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
