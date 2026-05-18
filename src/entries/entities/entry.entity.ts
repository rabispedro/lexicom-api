import { License } from './license.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Meaning } from './meaning.entity';
import { Phonetic } from './phonetic.entity';
import { IdGenerator } from 'src/shared/util/id-generator.util';
import { SourceUrl } from './source-url.entity';

@Entity('entry')
export class Entry {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column()
  word?: string;

  @Column()
  phonetic?: string;

  @OneToMany(() => Phonetic, (phonetic) => phonetic.entry, {
    cascade: true,
  })
  phonetics?: Phonetic[];

  @Column()
  origin?: string = '';

  @OneToMany(() => Meaning, (meaning) => meaning.entry, {
    cascade: true,
  })
  meanings?: Meaning[];

  @OneToOne(() => License)
  licence?: License;

  @OneToMany(() => SourceUrl, (sourceUrl) => sourceUrl.entry, {
    cascade: true,
  })
  sourceUrls?: SourceUrl[];

  @Column({ name: 'accesses', nullable: true })
  accesses: number = 0;

  accessed = () => {
    this.accesses += 1;
  };
}
