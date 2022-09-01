import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Stand, DjangoPaginatedResponse } from 'src/app/shared';
import { environment } from 'src/environments/environment';


export interface StandDetail extends Stand {
  stock: [{
    product__name: number;
    stock: number;
  }]
}


@Injectable({
  providedIn: 'root',
})
export class StandService {
  private apiStandsUrl: string = `${environment.apiBaseUrl}/stands`;

  constructor(private http: HttpClient) { }

  public getAllStands(): Observable<Stand[]> {
    return this.http.get<DjangoPaginatedResponse<Stand>>(`${this.apiStandsUrl}/`).pipe(
      map(response => response.results)
    );
  }

  public getStand(idStand: number): Observable<StandDetail> {
    return this.http.get<StandDetail>(`${this.apiStandsUrl}/${idStand}/`);
  }

  public createStand(stand: Stand): Observable<Stand> {
    return this.http.post<Stand>(`${this.apiStandsUrl}/`, stand);
  }

  public updateStand(stand: Stand): Observable<Stand> {
    return this.http.put<Stand>(`${this.apiStandsUrl}/${stand.id}/`, stand);
  }

  public deleteStand(idStand: number): Observable<void> {
    return this.http.delete<void>(`${this.apiStandsUrl}/${idStand}/`);
  }
}
