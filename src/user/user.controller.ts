import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserHistoryDto } from './dto/user-history.dto';
import { UserFavoritesDto } from './dto/user-favorites.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async findMe(): Promise<UserProfileDto> {
    return await this.userService.findMe()!;
  }

  @Get('/me/history')
  async findMyHistory(): Promise<UserHistoryDto> {
    return await this.userService.findMyHistory()!;
  }
  @Get('/me/favorites')
  async findMyFavorites(): Promise<UserFavoritesDto> {
    return await this.userService.findMyFavorites()!;
  }
}
