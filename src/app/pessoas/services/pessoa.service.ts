import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private apiPessoasUrl: string = `${environment.apiBaseUrl}/pessoas`;

  constructor(private http: HttpClient) {}

  public getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.apiPessoasUrl}`);
  }

  public criarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.apiPessoasUrl}/criar`, pessoa);
  }

  public atualizarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiPessoasUrl}/editar`, pessoa);
  }

  public excluirPessoa(idPessoa: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPessoasUrl}/excluir/${idPessoa}`);
  }
}
