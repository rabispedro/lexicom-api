import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionUser } from './entities/session-user.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'LexiCOM-API-WeakDefaultSecret',
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) },
    }),
    TypeOrmModule.forFeature([SessionUser]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
