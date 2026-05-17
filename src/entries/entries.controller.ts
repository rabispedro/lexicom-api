import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { Page } from 'src/shared/dto/page.dto';
import { EntryDto } from './dto/entry.dto';
import { BriefEntryDto } from './dto/brief-entry.dto';
// import { Public } from 'src/shared/metadata/public-route.metadata';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get('/en')
  async findAll(
    @Query() requestQuery: SearchQueryDto,
  ): Promise<Page<BriefEntryDto>> {
    return await this.entriesService.findAll(requestQuery)!;
  }

  // @Public()
  // @Get('/en/top')
  // async findTop(): Promise<Page<BriefEntryDto>> {
  //   return await this.entriesService.findTop()!;
  // }

  @Get('/en/:word')
  async findOne(@Param('word') word: string): Promise<EntryDto> {
    return await this.entriesService.findOne(word)!;
  }

  @Post('/en/:word/favorite')
  async favorite(@Param('word') word: string): Promise<void> {
    return await this.entriesService.favorite(word);
  }

  @Delete('/en/:word/unfavorite')
  async unfavorite(@Param('word') word: string): Promise<void> {
    return await this.entriesService.unfavorite(word);
  }
}
