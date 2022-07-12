import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DjangoPaginatedResponse, Transaction } from 'src/app/shared';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiTransactionUrl: string = `${environment.apiBaseUrl}/transactions`;

  constructor(private http: HttpClient) { }

  public getTransactions(): Observable<Transaction[]> {
    return this.http.get<DjangoPaginatedResponse<Transaction>>(`${(this.apiTransactionUrl)}/`).pipe(
      map(response => response.results)
    );
  }

  public getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiTransactionUrl}/${id}`);
  }

  public createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiTransactionUrl}/`, transaction);
  }

  public updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiTransactionUrl}/`, transaction);
  }

  public deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiTransactionUrl}/${id}`);
  }
}
