import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { IdGenerator } from 'src/shared/util/id-generator.util';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('session_user')
export class SessionUser {
  @PrimaryColumn()
  id: string = IdGenerator.generate();

  @Column({ name: 'name', nullable: false, length: 127 })
  name: string = '';

  @OneToOne(() => User)
  @JoinColumn({
    // name: 'user_of_session_user',
    // foreignKeyConstraintName: 'user_id_of_session_user_fk',
    // referencedColumnName: 'id',
  })
  user?: User;

  constructor(requestBody: SignUpDto, encodedPassword: string) {
    this.id = IdGenerator.generate();
    this.name = requestBody.name;
    this.user = new User(this.id, requestBody.email, encodedPassword);
  }
}
