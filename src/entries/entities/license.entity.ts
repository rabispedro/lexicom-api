import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('license')
export class License {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'name', nullable: true, length: 31 })
  name?: string;

  @Column({ name: 'url', nullable: true, length: 255 })
  url?: string;
}
