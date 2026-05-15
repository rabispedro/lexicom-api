import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignedDto } from './dto/signed.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUp(@Body() requestBody: SignUpDto): Promise<SignedDto> {
    return await this.authService.signUp(requestBody);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() requestBody: SignInDto): Promise<SignedDto> {
    return await this.authService.signIn(requestBody);
  }
}
