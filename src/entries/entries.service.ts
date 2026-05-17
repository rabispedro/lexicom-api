import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { BriefEntryDto } from './dto/brief-entry.dto';
import { Page } from 'src/shared/dto/page.dto';
import { EntryDto } from './dto/entry.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { Entry } from './entities/entry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CursorDto } from 'src/shared/dto/cursor.dto';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entriesRepository: Repository<Entry>,
  ) {}

  async findAll(
    requestQuery: SearchQueryDto,
    paginationQuery: CursorDto,
  ): Promise<Page<BriefEntryDto>> {
    const queryBuilder = this.entriesRepository
      .createQueryBuilder('entry')
      .orderBy('entry.word', 'ASC')
      .limit(paginationQuery.limit! + 1);

    if (paginationQuery.cursor) {
      queryBuilder.where('entry.word < :cursor', {
        cursor: paginationQuery.cursor,
      });
    }

    const entries = await queryBuilder.getMany();

    if (entries.length === 0) {
      throw new BadRequestException('Not found');
    }

    const hasNextPage = entries.length > paginationQuery.limit!;
    if (hasNextPage) {
      entries.pop();
    }

    return new Page<BriefEntryDto>(entries);
  }

  async findTop(): Promise<Page<BriefEntryDto>> {
    const entries = await this.entriesRepository.find({
      order: { word: 'ASC' },
      take: 10,
    });

    entries = (await httpEntry.json()) as Entry[];
  }

  async findOne(word: string): Promise<EntryDto> {
    const entry = await this.entriesRepository.findOneBy({ word: word });

    if (entry === null) {
      const httpEntry = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        {
          method: 'GET',
          mode: 'no-cors',
        },
      );

      if (httpEntry.status !== HttpStatus.OK.valueOf()) {
        throw new BadRequestException('Entry does not exists');
      }
    }

    return new EntryDto(entry!);
  }

  async favorite(word: string): Promise<void> {
    const entry = await this.entriesRepository.findOneBy({ word: word });

    if (entry === null) {
      const httpEntry = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        {
          method: 'GET',
          mode: 'no-cors',
        },
      );

      if (httpEntry.status !== HttpStatus.OK.valueOf()) {
        throw new BadRequestException('Entry does not exists');
      }
    }

    if (entry === null) {
      throw new BadRequestException('Not found');
    }
  }

  async unfavorite(word: string): Promise<void> {
    const entry = await this.entriesRepository.findOneBy({ word: word });

    if (entry === null) {
      const httpEntry = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        {
          method: 'GET',
          mode: 'no-cors',
        },
      );

      if (httpEntry.status !== HttpStatus.OK.valueOf()) {
        throw new BadRequestException('Entry does not exists');
      }
    }

    if (entry === null) {
      throw new BadRequestException('Not found');
    }
  }
}
