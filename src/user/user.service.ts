import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserHistoryDto } from './dto/user-history.dto';
import { UserFavoritesDto } from './dto/user-favorites.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findMe(): Promise<UserProfileDto> {
    return;
  }

  async findMyHistory(): Promise<UserHistoryDto> {
    return;
  }
  async findMyFavorites(): Promise<UserFavoritesDto> {
    return;
  }
}
