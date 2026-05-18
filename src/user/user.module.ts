import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { Antonym } from 'src/entries/entities/antonym.entity';
import { Definition } from 'src/entries/entities/definition.entity';
import { License } from 'src/entries/entities/license.entity';
import { Meaning } from 'src/entries/entities/meaning.entity';
import { Phonetic } from 'src/entries/entities/phonetic.entity';
import { SourceUrl } from 'src/entries/entities/source-url.entity';
import { Synonym } from 'src/entries/entities/synonym.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Antonym,
      Definition,
      Entry,
      License,
      Meaning,
      Phonetic,
      SourceUrl,
      Synonym,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
