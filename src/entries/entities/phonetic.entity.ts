import { IdGenerator } from 'src/shared/util/id-generator.util';
import { License } from './license.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Entry } from './entry.entity';

@Entity('phonetic')
export class Phonetic {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'text', nullable: true, length: 255 })
  text?: string;

  @Column({ name: 'audio', nullable: true, length: 255 })
  audio?: string;

  @Column({ name: 'source_url', nullable: true, length: 255 })
  sourceUrl?: string;

  @OneToOne(() => License)
  licence?: License;

  @ManyToOne(() => Entry, (entry) => entry.phonetics)
  entry?: Entry;
}
