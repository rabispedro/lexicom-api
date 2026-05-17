import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Entity } from 'typeorm';

@Entity('definition')
export class Definition {
  id: string = IdGenerator.generate();
  definition?: string;
  example?: string;
  synonyms: string[] = [];
  antonyms: string[] = [];
}
