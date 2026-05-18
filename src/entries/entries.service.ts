import { BadRequestException, Injectable } from '@nestjs/common';
import { Page } from 'src/shared/dto/page.dto';
import { EntryDto } from './dto/entry.dto';
import { Entry } from './entities/entry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CursorDto } from 'src/shared/dto/cursor.dto';
import { DictionaryApiRepository } from './disctionary-api.repository';
import { SearchQueryDto } from 'src/shared/dto/search-query.dto';
import { User } from 'src/user/entities/user.entity';
import { SessionUser } from 'src/auth/entities/session-user.entity';
import { IdGenerator } from 'src/shared/util/id-generator.util';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entriesRepository: Repository<Entry>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dictionaryApiRepository: DictionaryApiRepository,
  ) {}

  async findAll(
    requestQuery: SearchQueryDto,
    paginationQuery: CursorDto,
  ): Promise<Page<EntryDto>> {
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

    const totalItems = await this.entriesRepository.count();

    const hasNextPage = entries.length > paginationQuery.limit!;
    if (hasNextPage) {
      entries.pop();
    }

    const responseDto = entries.map((entry) => new EntryDto(entry));

    return new Page<EntryDto>(responseDto, totalItems, paginationQuery.cursor);
  }

  async findTop(): Promise<Page<EntryDto>> {
    const entries = await this.entriesRepository.find({
      order: { accesses: 'DESC', word: 'ASC' },
      take: 10,
    });

    const responseDto = entries.map((entry) => new EntryDto(entry));
    const totalItems = await this.entriesRepository.count();

    return new Page(responseDto, totalItems, undefined);
  }

  async findOne(word: string): Promise<EntryDto[]> {
    let entries = await this.entriesRepository.findBy({ word: word });

    if (!entries || entries.length === 0) {
      entries = await this.dictionaryApiRepository.find(word);
      entries.forEach((entry) => (entry.id = IdGenerator.generate()));

      await this.entriesRepository.save(entries);
    }

    const responseDto = entries.map((entry) => new EntryDto(entry));

    entries.forEach((entry) => entry.accessed());
    await this.entriesRepository.save(entries);

    return responseDto;
  }

  async favorite(id: string, sessionUser: SessionUser): Promise<void> {
    const entry = await this.entriesRepository.findOneBy({ id: id });

    if (!entry) {
      throw new BadRequestException('Entry not found');
    }

    sessionUser.user!.addToFavorites(entry);
    await this.userRepository.save(sessionUser.user!);
  }

  async unfavorite(id: string, sessionUser: SessionUser): Promise<void> {
    const entry = await this.entriesRepository.findOneBy({ id: id });

    if (!entry) {
      throw new BadRequestException('Entry not found');
    }

    sessionUser.user!.removeFromFavorites(entry);
    await this.userRepository.save(sessionUser.user!);
  }
}
