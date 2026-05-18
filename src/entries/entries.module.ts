import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { DictionaryApiRepository } from './disctionary-api.repository';
import { Entry } from './entities/entry.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Antonym } from './entities/antonym.entity';
import { Definition } from './entities/definition.entity';
import { License } from './entities/license.entity';
import { Meaning } from './entities/meaning.entity';
import { Phonetic } from './entities/phonetic.entity';
import { SourceUrl } from './entities/source-url.entity';
import { Synonym } from './entities/synonym.entity';

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
  controllers: [EntriesController],
  providers: [EntriesService, DictionaryApiRepository],
})
export class EntriesModule {}
