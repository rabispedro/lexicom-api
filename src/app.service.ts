import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(): object {
    return { message: 'English Dictionary' };
  }
}
