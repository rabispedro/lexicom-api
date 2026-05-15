export class Page<T> {
  results: T[] = [];
  totalDocs: number = -1;
  previous: string = '';
  next: string = '';
  hasNext: boolean = false;
  hasPrev: boolean = false;
}
