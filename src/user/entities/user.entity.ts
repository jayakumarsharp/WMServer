import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user, { cascade: true })
  portfolios: Portfolio[];
}
