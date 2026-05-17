import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Entity } from 'typeorm';

@Entity('license')
export class License {
  id: string = IdGenerator.generate();
  name: string = '';
  url: string = '';
}
