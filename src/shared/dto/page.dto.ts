export class Page<T> {
  results: T[] = [];
  totalDocs: number = -1;
  previous?: string = '';
  next?: string = '';
  hasNext: boolean = false;
  hasPrev: boolean = false;

  constructor(entries: T[], totalSize: number, cursor?: string) {
    this.results = entries;
    this.totalDocs = totalSize;
    this.previous = cursor;
    this.next = cursor;
    this.hasNext = cursor !== null;
    this.hasPrev = cursor !== entries[0];
  }
}
