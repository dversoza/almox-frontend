import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movimentacao } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
  private apiMovimentacaoUrl: string = `${environment.apiBaseUrl}/movimentacoes`;

  constructor(private http: HttpClient) {}

  public getMovimentacoes(): Observable<Movimentacao[]> {
    return this.http.get<Movimentacao[]>(this.apiMovimentacaoUrl);
  }

  public getMovimentacao(id: number): Observable<Movimentacao> {
    return this.http.get<Movimentacao>(`${this.apiMovimentacaoUrl}/${id}`);
  }

  public createMovimentacao(
    movimentacao: Movimentacao
  ): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(
      `${this.apiMovimentacaoUrl}/create`,
      movimentacao
    );
  }

  public updateMovimentacao(
    movimentacao: Movimentacao
  ): Observable<Movimentacao> {
    return this.http.put<Movimentacao>(
      `${this.apiMovimentacaoUrl}/update`,
      movimentacao
    );
  }

  public deleteMovimentacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiMovimentacaoUrl}/delete/${id}`);
  }
}
