import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DjangoPaginatedResponse, Transaction, TransactionType } from 'src/app/shared';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiTransactionUrl: string = `${environment.apiBaseUrl}/transactions`;
  private apiTransactionTypesUrl: string = `${environment.apiBaseUrl}/transaction-types`;

  constructor(private http: HttpClient) { }

  public getTransactions(): Observable<Transaction[]> {
    return this.http.get<DjangoPaginatedResponse<Transaction>>(`${(this.apiTransactionUrl)}/`).pipe(
      map(response =>
        response.results.map(transaction => ({
          ...transaction,
          price: transaction.price ? transaction.price / 100 : 0,
        }))
      )
    );
  }

  public getTransactionTypes(): Observable<TransactionType[]> {
    return this.http.get<DjangoPaginatedResponse<TransactionType>>(`${this.apiTransactionTypesUrl}/`).pipe(
      map(response => response.results)
    );
  }

  public getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiTransactionUrl}/${id}`);
  }

  public createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiTransactionUrl}/`, {
      id: transaction.id,
      datetime: transaction.datetime,
      details: transaction.details,
      operation: transaction.operation,
      price: transaction.price ? (transaction.price * 100).toFixed(0) : 0,
      quantity: transaction.quantity,
      person_id: transaction.person?.id,
      type_id: transaction.type?.id,
      stand_id: transaction.stand?.id,
      product_id: transaction.product?.id,
    });
  }

  public updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiTransactionUrl}/${transaction.id}/`, {
      id: transaction.id,
      datetime: transaction.datetime,
      details: transaction.details,
      operation: transaction.operation,
      price: transaction.price ? (transaction.price * 100).toFixed(0) : 0,
      quantity: transaction.quantity,
      person_id: transaction.person?.id,
      type_id: transaction.type?.id,
      stand_id: transaction.stand?.id,
      product_id: transaction.product?.id,
    });
  }

  public deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiTransactionUrl}/${id}/`);
  }
}
