import { IdGenerator } from 'src/shared/util/id-generator.util';
import { License } from './license.entity';
import { Entity } from 'typeorm';

@Entity('phonetic')
export class Phonetic {
  id: string = IdGenerator.generate();
  text: string = '';
  audio: string = '';
  sourceUrl: string = '';
  licence?: License;
}
