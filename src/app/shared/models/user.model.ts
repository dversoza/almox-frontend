import { Person } from '.';

export class User {
  constructor(
    public id?: number,
    public person?: Person,
    public active?: boolean,
    public isStaff?: boolean,
    public profile?: string,
    public username?: string,
    public password?: string
  ) { }
}
