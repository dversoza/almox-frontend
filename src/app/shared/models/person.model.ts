import { Stand } from './stand.model';

export class Person {
  constructor(
    public id?: number,
    public name?: string,
    public isBusiness?: boolean,
    public document?: string,
    public phone?: string,
    public stand?: Stand
  ) {}
}
