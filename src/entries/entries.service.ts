import { Injectable } from '@nestjs/common';
import { BriefEntryDto } from './dto/brief-entry.dto';
import { Page } from 'src/shared/dto/page.dto';
import { EntryDto } from './dto/entry.dto';
import { EntriesRepository } from './entries.repository';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class EntriesService {
  constructor(private readonly entriesRepository: EntriesRepository) {}

  async findAll(requestQuery: SearchQueryDto): Promise<Page<BriefEntryDto>> {}

  async findOne(word: string): Promise<EntryDto> {}

  async favorite(word: string): Promise<void> {}

  async unfavorite(word: string): Promise<void> {}
}
