import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserProfileDto {
  @ApiProperty()
  id: string = '';

  @ApiProperty()
  email: string = '';

  @ApiProperty()
  favoritesSize: number = 0;

  @ApiProperty()
  historySize: number = 0;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.favoritesSize = user.favorites.length;
    this.historySize = user.history.length;
  }
}
