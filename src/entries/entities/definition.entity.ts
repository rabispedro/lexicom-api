import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Antonym } from './antonym.entity';
import { Synonym } from './synonym.entity';
import { Meaning } from './meaning.entity';

@Entity('definition')
export class Definition {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'url', nullable: true, length: 1023 })
  definition?: string;

  @Column({ name: 'example', nullable: true, length: 2047 })
  example?: string;

  @ManyToOne(() => Meaning, (meaning) => meaning.definitions)
  meaning?: Meaning;

  @OneToMany(() => Synonym, (synonym) => synonym.definition, {
    cascade: true,
  })
  synonyms?: Synonym[];

  @OneToMany(() => Antonym, (antonym) => antonym.definition, {
    cascade: true,
  })
  antonyms?: Antonym[];
}
