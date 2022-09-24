import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Stand, DjangoPaginatedResponse, DjangoRequestOptionsList } from 'src/app/shared';
import { environment } from 'src/environments/environment';

export interface StandStock {
  product__name: string;
  stock: number;
  measurement_unit: string;
}

export interface StandDetail extends Stand {
  stock: StandStock[];
}

@Injectable({
  providedIn: 'root',
})
export class StandService {
  private apiStandsUrl: string = `${environment.apiBaseUrl}/stands`;

  constructor(private http: HttpClient) {}

  public getAllStands(options: DjangoRequestOptionsList): Observable<Stand[]> {
    if (!options.params?.query) {
      delete options.params?.query;
    }
    return this.http
      .get<DjangoPaginatedResponse<Stand>>(`${this.apiStandsUrl}/`, options)
      .pipe(map((response) => response.results));
  }

  public getStand(idStand: number): Observable<StandDetail> {
    return this.http.get<StandDetail>(`${this.apiStandsUrl}/${idStand}/`);
  }

  public createStand(stand: Stand): Observable<Stand> {
    return this.http.post<Stand>(`${this.apiStandsUrl}/`, {
      ...stand,
      manager_id: stand.manager?.id,
    });
  }

  public updateStand(stand: Stand): Observable<Stand> {
    return this.http.put<Stand>(`${this.apiStandsUrl}/${stand.id}/`, {
      ...stand,
      manager_id: stand.manager?.id,
    });
  }

  public deleteStand(idStand: number): Observable<void> {
    return this.http.delete<void>(`${this.apiStandsUrl}/${idStand}/`);
  }
}
