import { License } from './license.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Meaning } from './meaning.entity';
import { Phonetic } from './phonetic.entity';
import { IdGenerator } from 'src/shared/util/id-generator.util';

@Entity('entry')
export class Entry {
  @PrimaryColumn('id')
  id: string = IdGenerator.generate();

  @Column()
  word: string = '';
  
  @Column()
  phonetic: string = '';
  
  @OneToMany()
  @JoinColumn()
  phonetics: Phonetic[] = [];
  
  @Column()
  origin?: string;

  meanings?: Meaning[];

  licence?: License;


  sourceUrls: string[] = [];
}
