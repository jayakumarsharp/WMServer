import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Entity()
export class Holding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  purchasePrice: number;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.holdings, { onDelete: 'CASCADE' })
  portfolio: Portfolio;
}
