import { Injectable } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { EntryDto } from 'src/entries/dto/entry.dto';
import { Page } from 'src/shared/dto/page.dto';

@Injectable()
export class UserService {
  // constructor(private readonly userRepository: UserRepository) {}

  findMe(): Promise<UserProfileDto> | undefined {
    return undefined;
  }

  findMyHistory(): Promise<Page<EntryDto>> | undefined {
    return undefined;
  }
  findMyFavorites(): Promise<Page<EntryDto>> | undefined {
    return undefined;
  }
}
