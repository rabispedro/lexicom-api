import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Definition } from './definition.entity';
import { Entity } from 'typeorm';

@Entity('meaning')
export class Meaning {
  id: string = IdGenerator.generate();
  partOfSpeech: string = '';
  definitions: Definition[] = [];
}
