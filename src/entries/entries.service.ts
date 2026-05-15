import { Injectable } from '@nestjs/common';
import { BriefEntryDto } from './dto/brief-entry.dto';
import { Page } from 'src/shared/dto/page.dto';
import { EntryDto } from './dto/entry.dto';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class EntriesService {
  // constructor(private readonly entriesRepository: EntriesRepository) {}

  findAll(
    requestQuery: SearchQueryDto,
  ): Promise<Page<BriefEntryDto>> | undefined {
    return undefined;
  }

  findOne(word: string): Promise<EntryDto> | undefined {
    return undefined;
  }

  favorite(word: string): Promise<void> | undefined {
    return undefined;
  }

  unfavorite(word: string): Promise<void> | undefined {
    return undefined;
  }
}
