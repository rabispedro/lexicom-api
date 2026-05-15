import { BadRequestException, Injectable } from '@nestjs/common';
import { SignedDto } from './dto/signed.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { compare, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User)
    // private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(requestBody: SignUpDto): Promise<SignedDto> {
    const authRepository: User[] = [];

    let user: User | undefined = authRepository.find(
      (user) => user.email === requestBody.email,
    );

    if (user !== undefined) {
      throw new BadRequestException('User already exists');
    }

    const encodedPassword = hashSync(
      requestBody.password,
      process.env.ENCRYPT_SALT!,
    );

    user = new User(requestBody, encodedPassword);

    // user = await this.authRepository.create(user);
    // this.authRepository.save(user);
    authRepository.push(user);

    return {
      id: user.id,
      name: user.name,
      token: await this.generateBearerToken(user.id, user.email),
    };
  }

  async signIn(requestBody: SignInDto): Promise<SignedDto> {
    const authRepository: User[] = [];

    const user: User | undefined = authRepository.find(
      (user) => user.email === requestBody.email,
    );

    if (user === undefined) {
      throw new BadRequestException('Wrong credentials');
    }

    const passwordMatches: boolean = await compare(
      user.password,
      requestBody.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Wrong credentials');
    }

    return {
      id: user.id,
      name: user.name,
      token: await this.generateBearerToken(user.id, user.email),
    };
  }

  private async generateBearerToken(
    id: string,
    email: string,
  ): Promise<string> {
    const jwtPayload = {
      sub: id,
      username: email,
    };

    const token = await this.jwtService.signAsync(jwtPayload);

    return `Bearer ${token}`;
  }
}
