export class Page<T> {
  results: T[] = [];
  totalDocs: number = -1;
  previous?: string = '';
  next?: string = '';
  hasNext?: boolean = false;
  hasPrev?: boolean = false;

  constructor(
    entries: T[],
    totalSize: number,
    next?: string,
    previous?: string,
  ) {
    this.results = entries;
    this.totalDocs = totalSize;
    this.previous = previous;
    this.next = next;
    this.hasNext = !!next;
    this.hasPrev = !!previous;
  }
}
