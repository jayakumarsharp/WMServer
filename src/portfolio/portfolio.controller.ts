import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { AddHoldingDto } from './dto/add-holding.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

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

  
  @Patch(':portfolioId')
updatePortfolio(@Param('portfolioId') portfolioId: number, @Body() updateDto: UpdatePortfolioDto) {
  return this.portfolioService.updatePortfolio(portfolioId, updateDto);
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
  deletePortfolio(@Param('portfolioId', ParseIntPipe) portfolioId: number) {
    console.log(portfolioId);
    return this.portfolioService.deletePortfolio(portfolioId);
  }
  
}
