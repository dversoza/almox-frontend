import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product, DjangoPaginatedResponse } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiProductsUrl: string = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<DjangoPaginatedResponse<Product>>(`${this.apiProductsUrl}/`).pipe(
      map(response => response.results)
    );
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiProductsUrl}/${id}`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiProductsUrl}/`, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiProductsUrl}/${product.id}`,
      product
    );
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiProductsUrl}/${id}`);
  }
}
