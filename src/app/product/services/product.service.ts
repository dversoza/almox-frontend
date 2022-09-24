import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product, DjangoPaginatedResponse, DjangoRequestOptionsList } from 'src/app/shared';
import { environment } from 'src/environments/environment';

export interface ProductDetail extends Product {
  stand_stocks: [
    {
      stand__name: string;
      stock: number;
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiProductsUrl: string = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  public getAllProducts(options: DjangoRequestOptionsList): Observable<Product[]> {
    if (!options.params?.query) {
      delete options.params?.query;
    }
    return this.http
      .get<DjangoPaginatedResponse<Product>>(`${this.apiProductsUrl}/`, options)
      .pipe(map((response) => response.results));
  }

  public getProduct(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.apiProductsUrl}/${id}`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiProductsUrl}/`, {
      ...product,
      measurement_unit_id: product.measurement_unit?.id,
    });
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiProductsUrl}/${product.id}/`, {
      ...product,
      measurement_unit_id: product.measurement_unit?.id,
    });
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiProductsUrl}/${id}`);
  }
}
