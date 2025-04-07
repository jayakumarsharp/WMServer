import { IsOptional, IsString } from 'class-validator';

export class UpdatePortfolioDto {
  @IsOptional()
  @IsString()
  name?: string;
}
