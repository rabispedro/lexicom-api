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
      .limit((paginationQuery.limit ?? 10) + 1);

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

    const hasNextPage = entries.length > (paginationQuery.limit ?? 10);
    let next: string | undefined = undefined;
    const previous = entries.at(0)!.id;

    if (hasNextPage) {
      next = entries.at(-1)!.id;
      entries.pop();
    }

    const responseDto = entries.map((entry) => new EntryDto(entry));

    return new Page<EntryDto>(responseDto, totalItems, next, previous);
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

  async findOne(word: string, sessionUser: SessionUser): Promise<EntryDto[]> {
    let entries = await this.entriesRepository.findBy({ word: word });

    if (!entries || entries.length === 0) {
      entries = await this.dictionaryApiRepository.find(word);
      entries.forEach((entry) => {
        entry.id = IdGenerator.generate();
        entry.accessed = () => {
          entry.accesses += 1;
        };
        entry.meanings?.forEach((meaning) => {
          meaning.id = IdGenerator.generate();
          meaning.definitions?.forEach((definition) => {
            definition.id = IdGenerator.generate();
            definition.antonyms?.forEach(
              (antonym) => (antonym.id = IdGenerator.generate()),
            );
            definition.synonyms?.forEach(
              (synonym) => (synonym.id = IdGenerator.generate()),
            );
          });
        });
        entry.phonetics?.forEach((phonetic) => {
          phonetic.id = IdGenerator.generate();
          if (phonetic.licence) {
            phonetic.licence.id = IdGenerator.generate();
          }
        });
        // entry.sourceUrls?.forEach(
        //   (sourceUrl) => (sourceUrl.id = IdGenerator.generate()),
        // );
      });

      await this.entriesRepository.save(entries);

      const user = await this.userRepository.findOne({
        relations: {
          history: true,
        },
        where: { id: sessionUser.id },
      });

      console.log('User', user);

      entries.forEach((entry) => user!.addToHistory(entry));
      await this.userRepository.save(user!);
    }

    const responseDto = entries.map((entry) => new EntryDto(entry));

    entries.forEach((entry) => entry.accessed());
    await this.entriesRepository.save(entries);

    return responseDto;
  }

  async favorite(word: string, sessionUser: SessionUser): Promise<void> {
    const entry = await this.entriesRepository.findOneBy({ word: word });

    if (!entry) {
      throw new BadRequestException('Entry not found');
    }

    const user = await this.userRepository.findOne({
      relations: {
        favorites: true,
      },
      where: { id: sessionUser.id },
    });
    user!.addToFavorites(entry);
    await this.userRepository.save(user!);
  }

  async unfavorite(word: string, sessionUser: SessionUser): Promise<void> {
    const entry = await this.entriesRepository.findOneBy({ word: word });

    if (!entry) {
      throw new BadRequestException('Entry not found');
    }

    const user = await this.userRepository.findOne({
      relations: {
        favorites: true,
      },
      where: { id: sessionUser.id },
    });
    user!.removeFromFavorites(entry);
    await this.userRepository.save(user!);
  }
}
