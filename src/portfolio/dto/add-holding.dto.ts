import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddHoldingDto {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  purchasePrice: number;
}
