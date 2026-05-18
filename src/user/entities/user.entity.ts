import { Entry } from 'src/entries/entities/entry.entity';
import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'name', nullable: true, length: 127 })
  name: string = '';

  @Column({ name: 'email', nullable: true, length: 63, unique: true })
  email: string = '';

  @Column({ name: 'password', nullable: true })
  password: string = '';

  @ManyToMany(() => Entry)
  @JoinTable()
  favorites?: Entry[];

  @ManyToMany(() => Entry)
  @JoinTable()
  history?: Entry[];

  constructor(
    id: string,
    name: string,
    email: string,
    encodedPassword: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = encodedPassword;
  }

  addToHistory(entry: Entry): boolean {
    this.history ??= [];
    return this.history?.push(entry) === 1;
  }

  addToFavorites(entry: Entry): boolean {
    this.favorites ??= [];
    return this.favorites?.push(entry) === 1;
  }

  removeFromFavorites(entry: Entry): boolean {
    const index = this.favorites?.findIndex((e) => e.id === entry.id);

    if (index === -1 || index === undefined) {
      return false;
    }

    return this.favorites!.splice(index, 1).length > 0;
  }
}
