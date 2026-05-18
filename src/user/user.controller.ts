import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfileDto } from './dto/user-profile.dto';
import { EntryDto } from 'src/entries/dto/entry.dto';
import { Page } from 'src/shared/dto/page.dto';
import { SessionUser } from 'src/auth/entities/session-user.entity';
import { SearchQueryDto } from 'src/shared/dto/search-query.dto';
import { CursorDto } from 'src/shared/dto/cursor.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/me')
  async findMe(@Req() req): Promise<UserProfileDto> {
    return await this.userService.findMe(req.session_user as SessionUser);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/me/history')
  async findMyHistory(
    @Req() req,
    @Query() requestQuery: SearchQueryDto,
    @Query() paginationQuery: CursorDto,
  ): Promise<Page<EntryDto>> {
    return await this.userService.findMyHistory(
      requestQuery,
      paginationQuery,
      req.session_user as SessionUser,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('/me/favorites')
  async findMyFavorites(
    @Req() req,
    @Query() requestQuery: SearchQueryDto,
    @Query() paginationQuery: CursorDto,
  ): Promise<Page<EntryDto>> {
    return await this.userService.findMyFavorites(
      requestQuery,
      paginationQuery,
      req.session_user as SessionUser,
    );
  }
}
