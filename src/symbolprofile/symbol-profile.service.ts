// src/symbol-profile/symbol-profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SymbolProfile } from './entities/symbol-profile.entity';
import { CreateSymbolProfileDto } from './dto/create-symbol-profile.dto';
import { UpdateSymbolProfileDto } from './dto/update-symbol-profile.dto';

@Injectable()
export class SymbolProfileService {
  constructor(
    @InjectRepository(SymbolProfile)
    private readonly symbolProfileRepository: Repository<SymbolProfile>,
  ) {}

  async createSymbolProfile(createDto: CreateSymbolProfileDto): Promise<SymbolProfile> {
    const symbolProfile = this.symbolProfileRepository.create(createDto);
    return this.symbolProfileRepository.save(symbolProfile);
  }

  async updateSymbolProfile(id: string, updateDto: UpdateSymbolProfileDto): Promise<SymbolProfile> {
    await this.symbolProfileRepository.update(id, updateDto);
    const updatedProfile = await this.symbolProfileRepository.findOne({ where: { id } });
    if (!updatedProfile) throw new NotFoundException('Symbol Profile not found');
    return updatedProfile;
  }

  async getAllSymbolProfiles(): Promise<SymbolProfile[]> {
    return this.symbolProfileRepository.find();
  }

  async getSymbolProfileById(id: string): Promise<SymbolProfile> {
    const profile = await this.symbolProfileRepository.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Symbol Profile not found');
    return profile;
  }

  async deleteSymbolProfile(id: string): Promise<void> {
    const result = await this.symbolProfileRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Symbol Profile not found');
  }
}
