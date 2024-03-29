import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  DjangoPaginatedResponse,
  DjangoRequestOptionsList,
  Transaction,
  TransactionType,
} from 'src/app/shared';
import { environment } from 'src/environments/environment';

interface TransactionRequestOptions extends DjangoRequestOptionsList {
  params?: {
    page?: number;
    query?: string;
    type?: number;
    start_date?: string;
    end_date?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiTransactionUrl: string = `${environment.apiBaseUrl}/transactions`;
  private apiTransactionTypesUrl: string = `${environment.apiBaseUrl}/transaction-types`;

  constructor(private http: HttpClient) {}

  public getTransactions(options: TransactionRequestOptions): Observable<Transaction[]> {
    if (!options.params?.query) {
      delete options.params?.query;
    }
    return this.http
      .get<DjangoPaginatedResponse<Transaction>>(`${this.apiTransactionUrl}/`, options)
      .pipe(
        map((response) =>
          response.results.map((transaction) => ({
            ...transaction,
            price: transaction.price ? transaction.price / 100 : 0,
          }))
        )
      );
  }

  public getTransactionTypes(page: number = 1): Observable<TransactionType[]> {
    return this.http
      .get<DjangoPaginatedResponse<TransactionType>>(`${this.apiTransactionTypesUrl}/`, {
        params: {
          page: page.toString(),
        },
      })
      .pipe(map((response) => response.results));
  }

  public getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiTransactionUrl}/${id}`);
  }

  public createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiTransactionUrl}/`, {
      ...transaction,
      price: transaction.price ? (transaction.price * 100).toFixed(0) : 0,
      person_id: transaction.person?.id,
      type_id: transaction.type?.id,
      from_stand_id: transaction.from_stand?.id,
      to_stand_id: transaction.to_stand?.id,
      product_id: transaction.product?.id,
    });
  }

  public updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiTransactionUrl}/${transaction.id}/`, {
      ...transaction,
      price: transaction.price ? (transaction.price * 100).toFixed(0) : 0,
      person_id: transaction.person?.id,
      type_id: transaction.type?.id,
      from_stand_id: transaction.from_stand?.id,
      to_stand_id: transaction.to_stand?.id,
      product_id: transaction.product?.id,
    });
  }

  public deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiTransactionUrl}/${id}/`);
  }
}
