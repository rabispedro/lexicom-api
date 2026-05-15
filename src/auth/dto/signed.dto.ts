import { ApiProperty } from '@nestjs/swagger';

export class SignedDto {
  @ApiProperty()
  id: string = '';

  @ApiProperty()
  name: string = '';

  @ApiProperty()
  token: string = '';
}
