// src/symbol-profile/entities/symbol-profile.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('symbol_profile')
export class SymbolProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['YAHOO', 'ALPHA_VANTAGE'],
  })
  dataSource: 'YAHOO' | 'ALPHA_VANTAGE';

  @Column({ type: 'varchar', length: 255, unique: true })
  symbol: string;

  @Column('varchar', { length: 255, nullable: true })
  name?: string;

  @Column('varchar', { length: 255, nullable: true })
  assetClass?: string;

  @Column('varchar', { length: 255, nullable: true })
  assetSubClass?: string;

  @Column('varchar', { length: 10, nullable: true })
  currency?: string;
}
