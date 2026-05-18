import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Definition } from './definition.entity';

@Entity('antonym')
export class Antonym {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'value', nullable: true, length: 255 })
  value?: string;

  @ManyToOne(() => Definition, (definition) => definition.antonyms)
  definition?: Definition;

  constructor(value: string) {
    this.value = value;
  }
}
