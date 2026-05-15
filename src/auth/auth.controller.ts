import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignedDto } from './dto/signed.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() requestBody: SignUpDto): Promise<SignedDto> {
    return await this.authService.signUp(requestBody);
  }

  @Post('/signin')
  async signIn(@Body() requestBody: SignInDto): Promise<SignedDto> {
    return await this.authService.signIn(requestBody);
  }
}
