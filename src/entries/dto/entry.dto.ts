import { Entry } from '../entities/entry.entity';

export class EntryDto {
  name: string = '';

  constructor(entry: Entry) {
    this.name = entry.word;
  }
}
