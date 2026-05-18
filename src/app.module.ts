import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EntriesModule } from './entries/entries.module';
import { UserModule } from './user/user.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './shared/guard/auth.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Entry } from './entries/entities/entry.entity';
import { SessionUser } from './auth/entities/session-user.entity';

@Module({
  imports: [
    AuthModule,
    EntriesModule,
    UserModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 10000,
          limit: 20,
        },
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SQL_HOST ?? 'localhost',
      port: Number(process.env.SQL_PORT) ?? 5444,
      username: process.env.SQL_USER ?? 'lexicom_user',
      password: process.env.SQL_PASSWORD ?? 'Lex1C0M_S3CR3T_P4SSW0RD',
      database: process.env.SQL_DB ?? 'lexicom_db',
      entities: [SessionUser, Entry, User],
      autoLoadEntities: true,
      synchronize: true,
      // migrations: [`../migrations/*{.js,.ts}`],
      // migrationsRun: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
