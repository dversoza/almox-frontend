import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/shared/models/produto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiProdutosUrl: string = `${environment.apiBaseUrl}/produtos`;

  constructor(private http: HttpClient) {}

  public getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiProdutosUrl);
  }

  public getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiProdutosUrl}/${id}`);
  }

  public addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiProdutosUrl}/create`, produto);
  }

  public updateProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(
      `${this.apiProdutosUrl}/update/${produto.id}`,
      produto
    );
  }

  public deleteProduto(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.apiProdutosUrl}/delete/${id}`);
  }
}
