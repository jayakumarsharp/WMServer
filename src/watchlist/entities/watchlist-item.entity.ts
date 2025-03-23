import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Watchlist } from './watchlist.entity';

@Entity()
export class WatchlistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Watchlist, (watchlist) => watchlist.items, {
    onDelete: 'CASCADE',
  })
  watchlist: Watchlist;

  @Column()
  symbol: string;

  @Column()
  exchange: string;

  @Column()
  market: string;

  @CreateDateColumn()
  addedAt: Date;
}
