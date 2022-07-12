import { Stand } from './stand.model';
import { Person } from './person.model';
import { Product } from './product.model';
import { User } from './user.model';

enum TransactionType {
  COMPRA = 'COMPRA',
  DOAÇÃO = 'DOAÇÃO',
  DEVOLUÇÃO = 'DEVOLUÇÃO',
  INTERNA = 'INTERNA',
}

enum TransactionWay {
  IN = 'ENTRADA',
  OUT = 'SAÍDA',
}

export class Transaction {
  constructor(
    public id?: number,
    public created_at?: Date,
    public updated_at?: Date,
    public created_by?: User,
    public updated_by?: User,
    public stand?: Stand,
    public product?: Product,
    public person?: Person,
    public way?: TransactionWay,
    public type?: TransactionType,
    public datetime: Date = new Date(),
    public quantity?: number,
    public price?: number,
    public details?: string
  ) { }
}
