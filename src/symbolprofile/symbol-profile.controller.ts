// src/symbol-profile/symbol-profile.controller.ts
import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { SymbolProfileService } from './symbol-profile.service';
import { CreateSymbolProfileDto } from './dto/create-symbol-profile.dto';
import { UpdateSymbolProfileDto } from './dto/update-symbol-profile.dto';

@Controller('symbol-profile')
export class SymbolProfileController {
  constructor(private readonly symbolProfileService: SymbolProfileService) {}

  @Post()
  create(@Body() createDto: CreateSymbolProfileDto) {
    return this.symbolProfileService.createSymbolProfile(createDto);
  }

  @Get()
  getAll() {
    return this.symbolProfileService.getAllSymbolProfiles();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.symbolProfileService.getSymbolProfileById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSymbolProfileDto) {
    return this.symbolProfileService.updateSymbolProfile(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.symbolProfileService.deleteSymbolProfile(id);
  }
}
