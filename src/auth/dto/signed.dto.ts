import { ApiProperty } from '@nestjs/swagger';
import { SessionUser } from '../entities/session-user.entity';

export class SignedDto {
  @ApiProperty()
  id: string = '';

  @ApiProperty()
  name: string = '';

  @ApiProperty()
  token: string = '';

  constructor(sessionUser: SessionUser, token: string) {
    this.id = sessionUser.user!.id;
    this.name = sessionUser.name;
    this.token = token;
  }
}
