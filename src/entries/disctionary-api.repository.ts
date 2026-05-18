import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Entry } from './entities/entry.entity';

@Injectable()
export class DictionaryApiRepository {
  async find(word: string): Promise<Entry[]> {
    const httpEntry = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      {
        method: 'GET',
        mode: 'no-cors',
      },
    );

    if (httpEntry.status !== HttpStatus.OK.valueOf()) {
      throw new BadRequestException('Entry does not exists');
    }

    return (await httpEntry.json()) as Entry[];
  }
}
