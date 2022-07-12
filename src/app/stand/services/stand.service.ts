import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Stand, DjangoPaginatedResponse } from 'src/app/shared';
import { environment } from 'src/environments/environment';

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

  public getStand(idStand: number): Observable<Stand> {
    return this.http.get<Stand>(`${this.apiStandsUrl}/${idStand}`);
  }

  public createStand(stand: Stand): Observable<Stand> {
    return this.http.post<Stand>(`${this.apiStandsUrl}/create/`, stand);
  }

  public updateStand(stand: Stand): Observable<Stand> {
    return this.http.put<Stand>(`${this.apiStandsUrl}/update/`, stand);
  }

  public deleteStand(idStand: number): Observable<void> {
    return this.http.delete<void>(`${this.apiStandsUrl}/delete/${idStand}`);
  }
}
