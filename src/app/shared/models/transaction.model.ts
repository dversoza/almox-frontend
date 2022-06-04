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
    public createdAt?: Date,
    public createdBy?: User,
    public updatedAt?: Date,
    public updatedBy?: User,
    public stand?: Stand,
    public product?: Product,
    public person?: Person,
    public way?: TransactionWay,
    public type?: TransactionType,
    public datetime?: string,
    public quantity?: number,
    public price?: number,
    public details?: string
  ) { }
}
