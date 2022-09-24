import { Person } from './person.model';

export class Stand {
  constructor(
    public id?: number,
    public active?: boolean,
    public name?: string,
    public contact?: string,
    public manager?: Person
  ) {}
}
