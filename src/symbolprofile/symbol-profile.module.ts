// src/symbol-profile/symbol-profile.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymbolProfileService } from './symbol-profile.service';
import { SymbolProfileController } from './symbol-profile.controller';
import { SymbolProfile } from './entities/symbol-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SymbolProfile])],
  providers: [SymbolProfileService],
  controllers: [SymbolProfileController],
})
export class SymbolProfileModule {}
