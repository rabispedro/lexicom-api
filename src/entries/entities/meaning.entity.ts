import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Definition } from './definition.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Entry } from './entry.entity';

@Entity('meaning')
export class Meaning {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'partOfSpeech', nullable: true, length: 1023 })
  partOfSpeech?: string;

  @OneToMany(() => Definition, (definition) => definition.meaning, {
    cascade: true,
  })
  definitions?: Definition[];

  @ManyToOne(() => Entry, (entry) => entry.meanings)
  entry?: Entry;
}
