import { Person } from '.';

export class User {
  constructor(
    public id?: number,
    public is_active?: boolean,
    public is_staff?: boolean,
    public email?: string,
    public groups?: string,
    public person?: Person,
    public username?: string,
  ) { }
}
