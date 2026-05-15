import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignedDto } from './dto/signed.dto';
import { Public } from 'src/shared/metadata/public-route.metadata';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUp(@Body() requestBody: SignUpDto): Promise<SignedDto> {
    return await this.authService.signUp(requestBody);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() requestBody: SignInDto): Promise<SignedDto> {
    return await this.authService.signIn(requestBody);
  }
}
