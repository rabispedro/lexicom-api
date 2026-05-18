import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { DictionaryApiRepository } from './disctionary-api.repository';
import { Entry } from './entities/entry.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Entry, User])],
  controllers: [EntriesController],
  providers: [EntriesService, DictionaryApiRepository],
})
export class EntriesModule {}
