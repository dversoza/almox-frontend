import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/shared';
import { environment } from 'src/environments/environment';

interface TransactionResponse {
  transaction: Transaction;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiTransactionUrl: string = `${environment.apiBaseUrl}/transactions`;

  constructor(private http: HttpClient) { }

  public getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${(this.apiTransactionUrl)}/`);
  }

  public getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiTransactionUrl}/${id}`);
  }

  public createTransaction(
    transaction: Transaction
  ): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${this.apiTransactionUrl}/create`,
      transaction
    );
  }

  public updateTransaction(
    transaction: Transaction
  ): Observable<Transaction> {
    return this.http.put<Transaction>(
      `${this.apiTransactionUrl}/update`,
      transaction
    );
  }

  public deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiTransactionUrl}/delete/${id}`);
  }
}
