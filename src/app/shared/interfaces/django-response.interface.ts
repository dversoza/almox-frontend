export interface DjangoPaginatedResponse<T> {
  count: number;
  next: number;
  previous: number;
  results: T[];
}
