import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { AddHoldingDto } from './dto/add-holding.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  createPortfolio(@Req() req, @Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.createPortfolio(
      req.user.id,
      createPortfolioDto,
    );
  }

  @Get()
  getUserPortfolios(@Req() req) {
    return this.portfolioService.getUserPortfolios(req.user.id);
  }

  @Post(':portfolioId/holdings')
  addHolding(
    @Param('portfolioId') portfolioId: number,
    @Body() addHoldingDto: AddHoldingDto,
  ) {
    return this.portfolioService.addHolding(portfolioId, addHoldingDto);
  }

  @Delete(':portfolioId')
  deletePortfolio(@Param('portfolioId') portfolioId: number) {
    return this.portfolioService.deletePortfolio(portfolioId);
  }
}
