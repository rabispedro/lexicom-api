import { IdGenerator } from 'src/shared/util/id-generator.util';
import { License } from './license.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Entry } from './entry.entity';

@Entity('phonetic')
export class Phonetic {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'text', nullable: false, length: 255 })
  text: string = '';

  @Column({ name: 'audio', nullable: false, length: 255 })
  audio: string = '';

  @Column({ name: 'source_url', nullable: false, length: 255 })
  sourceUrl: string = '';

  @Column({ name: 'licence', nullable: false, length: 63 })
  licence?: License;

  @ManyToOne(() => Entry, (entry) => entry.phonetics)
  entry?: Entry;
}
