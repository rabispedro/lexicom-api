import { IdGenerator } from 'src/shared/util/id-generator.util';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('session_user')
export class SessionUser {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @OneToOne(() => User, {
    cascade: true,
  })
  @JoinColumn()
  user?: User;

  constructor() {
    this.id = IdGenerator.generate();
  }
}
