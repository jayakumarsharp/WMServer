import { IsNotEmpty } from 'class-validator';

export class CreateWatchlistDto {
  @IsNotEmpty()
  name: string;
}
