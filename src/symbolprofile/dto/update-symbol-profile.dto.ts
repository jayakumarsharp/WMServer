import { PartialType } from '@nestjs/mapped-types';
import { CreateSymbolProfileDto } from './create-symbol-profile.dto';

export class UpdateSymbolProfileDto extends PartialType(CreateSymbolProfileDto) {}
