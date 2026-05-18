import { Entry } from 'src/entries/entities/entry.entity';
import { IdGenerator } from 'src/shared/util/id-generator.util';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'name', nullable: false, length: 127 })
  name: string = '';

  @Column({ name: 'email', nullable: false, length: 63, unique: true })
  email: string = '';

  @Column({ name: 'password', nullable: false })
  password: string = '';

  @ManyToMany(() => Entry)
  @JoinTable()
  favorites: Entry[] = [];

  @ManyToMany(() => Entry)
  @JoinTable()
  history: Entry[] = [];

  constructor(
    id: string,
    email: string,
    name: string,
    encodedPassword: string,
    favorites: Entry[] = [],
    history: Entry[] = [],
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = encodedPassword;
    this.favorites = favorites;
    this.history = history;
  }

  addToHistory(entry: Entry): boolean {
    return this.history.push(entry) === 1;
  }

  addToFavorites(entry: Entry): boolean {
    return this.favorites.push(entry) === 1;
  }

  removeFromFavorites(entry: Entry): boolean {
    const index = this.favorites.findIndex((e) => e.id === entry.id);

    if (index === -1) {
      return false;
    }

    return this.favorites.splice(index, 1).length > 0;
  }
}
