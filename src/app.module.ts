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
import { Antonym } from './entries/entities/antonym.entity';
import { Definition } from './entries/entities/definition.entity';
import { License } from './entries/entities/license.entity';
import { Meaning } from './entries/entities/meaning.entity';
import { Phonetic } from './entries/entities/phonetic.entity';
import { SourceUrl } from './entries/entities/source-url.entity';
import { Synonym } from './entries/entities/synonym.entity';

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
      host: process.env.SQL_HOST,
      port: Number(process.env.SQL_PORT),
      username: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB,
      entities: [
        SessionUser,
        User,
        Antonym,
        Definition,
        Entry,
        License,
        Meaning,
        Phonetic,
        SourceUrl,
        Synonym,
      ],
      autoLoadEntities: true,
      // synchronize: true,
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
