import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignedDto } from './dto/signed.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signUp(requestBody: SignUpDto): Promise<SignedDto> {
    return new SignedDto();
  }

  async signIn(requestBody: SignInDto): Promise<SignedDto> {
    return new SignedDto();
  }
}
