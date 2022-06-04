import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiProductsUrl: string = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiProductsUrl}/`);
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiProductsUrl}/${id}`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiProductsUrl}/create`, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiProductsUrl}/update/${product.id}`,
      product
    );
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiProductsUrl}/delete/${id}`);
  }
}
