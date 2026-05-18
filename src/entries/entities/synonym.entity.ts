import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Definition } from './definition.entity';

@Entity('synonym')
export class Synonym {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'value', nullable: false, length: 255 })
  value: string = '';

  @ManyToOne(() => Definition, (definition) => definition.synonyms)
  definition?: Definition;

  constructor(value: string) {
    this.value = value;
  }
}
