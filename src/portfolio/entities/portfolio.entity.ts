import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Holding } from './holding.entity';
import { Watchlist } from '../../watchlist/entities/watchlist.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.portfolios, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Holding, (holding) => holding.portfolio, { cascade: true })
  holdings: Holding[];

  @OneToMany(() => Watchlist, (watchlist) => watchlist.portfolio, {
    cascade: true,
  })
  watchlists: Watchlist[];
}
