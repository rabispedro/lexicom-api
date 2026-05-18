import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Entry } from './entry.entity';

@Entity('source_url')
export class SourceUrl {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'value', nullable: true })
  value?: string;

  @ManyToOne(() => Entry, (entry) => entry.sourceUrls)
  entry?: Entry;

  constructor(value: string) {
    this.value = value;
  }
}
