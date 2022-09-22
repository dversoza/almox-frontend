import { Stand } from './stand.model';
import { Person } from './person.model';
import { Product } from './product.model';
import { User } from './user.model';

export class TransactionType {
  constructor(
    public id?: number,
    public name?: string,
    public operation?: string,
    public description?: string,
  ) { }
}

enum TransactionOperation {
  IN = 'E',
  OUT = 'S',
}

export class Transaction {
  public id?: number
  public created_at?: Date
  public updated_at?: Date
  public created_by?: User
  public updated_by?: User
  public stand?: Stand
  public product?: Product
  public person?: Person
  public operation?: TransactionOperation
  public type?: TransactionType
  public datetime?: Date
  public quantity?: number
  public price?: number
  public details?: string
}
