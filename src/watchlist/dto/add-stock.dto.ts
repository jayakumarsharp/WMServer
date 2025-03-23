import { IsNotEmpty } from 'class-validator';

export class AddStockDto {
  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  exchange: string;

  @IsNotEmpty()
  market: string;
}
