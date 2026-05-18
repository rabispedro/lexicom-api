import { BadRequestException, Injectable } from '@nestjs/common';
import { SignedDto } from './dto/signed.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hashSync } from 'bcrypt';
import { SessionUser } from './entities/session-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SessionUser)
    private readonly authRepository: Repository<SessionUser>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(requestBody: SignUpDto): Promise<SignedDto> {
    let sessionUser = await this.authRepository.findOneBy({
      user: {
        email: requestBody.email,
      },
    });

    if (sessionUser !== null) {
      throw new BadRequestException('User already exists');
    }

    const encodedPassword = hashSync(
      requestBody.password,
      process.env.ENCRYPT_SALT!,
    );

    sessionUser = new SessionUser();
    const user = new User(
      sessionUser.id,
      requestBody.name,
      requestBody.email,
      encodedPassword,
    );
    sessionUser.user = user;
    await this.authRepository.save(sessionUser);
    await this.userRepository.save(user);

    const token = await this.generateBearerToken(
      sessionUser.id,
      requestBody.email,
    );

    return new SignedDto(sessionUser, token);
  }

  async signIn(requestBody: SignInDto): Promise<SignedDto> {
    const sessionUser = await this.authRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        user: {
          email: requestBody.email,
        },
      },
    });

    if (sessionUser === null) {
      throw new BadRequestException('Wrong credentials');
    }

    const passwordMatches: boolean = await compare(
      requestBody.password,
      sessionUser.user!.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.generateBearerToken(
      sessionUser.id,
      sessionUser.user!.email,
    );

    return new SignedDto(sessionUser, token);
  }

  private async generateBearerToken(
    id: string,
    email: string,
  ): Promise<string> {
    const jwtPayload = {
      sub: id,
      username: email,
      expiresIn: 600,
    };

    const token = await this.jwtService.signAsync(jwtPayload);

    return `Bearer ${token}`;
  }
}
