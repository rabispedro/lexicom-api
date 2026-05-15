import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EntriesModule } from './entries/entries.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/guard/auth.guard';

@Module({
  imports: [AuthModule, EntriesModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
