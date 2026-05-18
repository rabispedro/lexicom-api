import { SignUpDto } from 'src/auth/dto/sign-up.dto';
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

  constructor(requestBody: SignUpDto, encodedPassword: string) {
    this.id = IdGenerator.generate();
    this.user = new User(
      this.id,
      requestBody.email,
      requestBody.name,
      encodedPassword,
    );
  }
}
