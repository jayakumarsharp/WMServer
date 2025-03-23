import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';
import { WatchlistItem } from './watchlist-item.entity';

@Entity()
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.watchlists, {
    onDelete: 'CASCADE',
  })
  portfolio: Portfolio;

  @OneToMany(() => WatchlistItem, (item) => item.watchlist, { cascade: true })
  items: WatchlistItem[];

  @CreateDateColumn()
  createdAt: Date;
}
