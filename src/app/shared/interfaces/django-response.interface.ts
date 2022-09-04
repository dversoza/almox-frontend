export interface DjangoPaginatedResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
