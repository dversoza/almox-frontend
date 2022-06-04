import { Person } from './person.model';

export class Stand {
  constructor(
    public id?: number,
    public name?: string,
    public contact?: string,
    public manager?: Person
  ) { }
}
