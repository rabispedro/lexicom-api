import { Injectable } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserHistoryDto } from './dto/user-history.dto';
import { UserFavoritesDto } from './dto/user-favorites.dto';

@Injectable()
export class UserService {
  // constructor(private readonly userRepository: UserRepository) {}

  findMe(): Promise<UserProfileDto> | undefined {
    return undefined;
  }

  findMyHistory(): Promise<UserHistoryDto> | undefined {
    return undefined;
  }
  findMyFavorites(): Promise<UserFavoritesDto> | undefined {
    return undefined;
  }
}
