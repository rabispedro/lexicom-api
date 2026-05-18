import { Definition } from '../entities/definition.entity';
import { Entry } from '../entities/entry.entity';
import { License } from '../entities/license.entity';
import { Meaning } from '../entities/meaning.entity';
import { Phonetic } from '../entities/phonetic.entity';

export class EntryDto {
  id: string = '';
  word?: string = '';
  phonetic?: string = '';
  phonetics?: PhoneticDto[] = [];
  origin?: string;
  meanings?: MeaningDto[] = [];
  licence?: LicenseDto;
  sourceUrls?: string[] = [];

  constructor(entry: Entry) {
    this.id = entry.id;
    this.word = entry.word;
    this.phonetic = entry.phonetic;
    this.phonetics = entry.phonetics?.map(
      (phonetic) => new PhoneticDto(phonetic),
    );
    this.origin = entry.origin;
    this.meanings = entry.meanings?.map((meaning) => new MeaningDto(meaning));
    this.licence = new LicenseDto(entry.licence);
    this.sourceUrls = entry.sourceUrls?.map((sourceUrl) => sourceUrl.value!);
  }
}

export class PhoneticDto {
  text?: string = '';
  audio?: string = '';
  sourceUrl?: string = '';
  licence?: LicenseDto;

  constructor(phonetic: Phonetic) {
    this.text = phonetic.text;
    this.audio = phonetic.audio;
    this.sourceUrl = phonetic.sourceUrl;
    this.licence = new LicenseDto(phonetic.licence);
  }
}

export class LicenseDto {
  name: string = '';
  url: string = '';

  constructor(license?: License) {
    this.name = license?.name ?? '';
    this.url = license?.url ?? '';
  }
}

export class MeaningDto {
  partOfSpeech?: string = '';
  definitions?: DefinitionDto[] = [];

  constructor(meaning: Meaning) {
    this.partOfSpeech = meaning.partOfSpeech;
    this.definitions = meaning.definitions?.map(
      (definition) => new DefinitionDto(definition),
    );
  }
}

export class DefinitionDto {
  definition?: string;
  example?: string;
  synonyms?: string[] = [];
  antonyms?: string[] = [];

  constructor(definition: Definition) {
    this.definition = definition.definition;
    this.example = definition.example;
    this.synonyms = definition.synonyms?.map((synonym) => synonym.value!);
    this.antonyms = definition.antonyms?.map((antonym) => antonym.value!);
  }
}
