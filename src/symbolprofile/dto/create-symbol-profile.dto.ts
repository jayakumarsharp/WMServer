// src/symbol-profile/dto/create-symbol-profile.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateSymbolProfileDto {
  @IsEnum(['YAHOO', 'ALPHA_VANTAGE'])
  dataSource: 'YAHOO' | 'ALPHA_VANTAGE';

  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  assetClass?: string;

  @IsOptional()
  @IsString()
  assetSubClass?: string;

  @IsOptional()
  @IsString()
  currency?: string;
}
