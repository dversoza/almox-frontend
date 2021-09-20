import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadeMedida } from 'src/app/shared/models/unidade-medida.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnidadeMedidaService {
  private apiUmUrl: string = `${environment.apiBaseUrl}/um`;

  constructor(private http: HttpClient) {}

  public getUM(): Observable<UnidadeMedida[]> {
    return this.http.get<UnidadeMedida[]>(this.apiUmUrl);
  }

  public createUM(um: UnidadeMedida): Observable<UnidadeMedida> {
    return this.http.post<UnidadeMedida>(`${this.apiUmUrl}/create`, um);
  }

  public updateUM(um: UnidadeMedida): Observable<UnidadeMedida> {
    return this.http.put<UnidadeMedida>(`${this.apiUmUrl}/update`, um);
  }

  public deleteUM(id: number): Observable<UnidadeMedida> {
    return this.http.delete<UnidadeMedida>(`${this.apiUmUrl}/delete/${id}`);
  }
}
