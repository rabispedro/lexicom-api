import { Injectable } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { EntryDto } from 'src/entries/dto/entry.dto';
import { Page } from 'src/shared/dto/page.dto';
import { SessionUser } from 'src/auth/entities/session-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { SearchQueryDto } from 'src/shared/dto/search-query.dto';
import { CursorDto } from 'src/shared/dto/cursor.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Entry)
    private readonly entriesRepository: Repository<Entry>,
  ) {}

  async findMe(sessionUser: SessionUser): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      relations: {
        favorites: true,
        history: true,
      },
      where: { id: sessionUser.id },
    });
    return new UserProfileDto(user!);
  }

  async findMyFavorites(
    requestQuery: SearchQueryDto,
    paginationQuery: CursorDto,
    sessionUser: SessionUser,
  ): Promise<Page<EntryDto>> {
    const user = await this.userRepository.findOne({
      relations: {
        favorites: true,
      },
      where: { id: sessionUser.id },
    });
    const favoriteIds = user!.favorites?.map((favorite) => favorite.id) ?? [];

    const entries = await this.entriesRepository.findBy({
      id: In<string>(favoriteIds),
    });

    const totalItems = await this.entriesRepository.countBy({
      id: In<string>(favoriteIds),
    });

    const responseDto = entries.map((entry) => new EntryDto(entry));

    return new Page<EntryDto>(responseDto, totalItems);
  }

  async findMyHistory(
    requestQuery: SearchQueryDto,
    paginationQuery: CursorDto,
    sessionUser: SessionUser,
  ): Promise<Page<EntryDto>> {
    const user = await this.userRepository.findOne({
      relations: {
        history: true,
      },
      where: {
        id: sessionUser.id,
      },
    });
    const historyIds = user!.history?.map((history) => history.id) ?? [];

    const entries = await this.entriesRepository.findBy({
      id: In(historyIds),
    });

    const totalItems = await this.entriesRepository.countBy({
      id: In(historyIds),
    });

    const responseDto = entries.map((entry) => new EntryDto(entry));

    return new Page<EntryDto>(responseDto, totalItems);
  }
}
