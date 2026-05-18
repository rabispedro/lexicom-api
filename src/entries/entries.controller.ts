import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { Page } from 'src/shared/dto/page.dto';
import { EntryDto } from './dto/entry.dto';
import { Public } from 'src/shared/metadata/public-route.metadata';
import { SearchQueryDto } from 'src/shared/dto/search-query.dto';
import { SessionUser } from 'src/auth/entities/session-user.entity';
import { CursorDto } from 'src/shared/dto/cursor.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get('/en')
  async findAll(
    @Query() requestQuery: SearchQueryDto,
    @Query() paginationQuery: CursorDto,
  ): Promise<Page<EntryDto>> {
    return await this.entriesService.findAll(requestQuery, paginationQuery);
  }

  @Public()
  @Get('/en/top')
  async findTop(): Promise<Page<EntryDto>> {
    return await this.entriesService.findTop();
  }

  @Get('/en/:word')
  async findOne(@Req() req, @Param('word') word: string): Promise<EntryDto[]> {
    return await this.entriesService.findOne(
      word,
      req.session_user as SessionUser,
    );
  }

  @Post('/en/:word/favorite')
  async favorite(@Req() req, @Param('word') word: string): Promise<void> {
    return await this.entriesService.favorite(
      word,
      req.session_user as SessionUser,
    );
  }

  @Delete('/en/:word/unfavorite')
  async unfavorite(@Req() req, @Param('word') word: string): Promise<void> {
    return await this.entriesService.unfavorite(
      word,
      req.session_user as SessionUser,
    );
  }
}
