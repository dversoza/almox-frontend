import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stand } from 'src/app/shared/models/stand.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StandService {
  private apiStandsUrl: string = `${environment.apiBaseUrl}/stands`;

  constructor(private http: HttpClient) { }

  public getStands(): Observable<Stand[]> {
    return this.http.get<Stand[]>(`${this.apiStandsUrl}`);
  }

  public getStandById(idStand: number): Observable<Stand> {
    return this.http.get<Stand>(`${this.apiStandsUrl}/${idStand}`);
  }

  public addStand(stand: Stand): Observable<Stand> {
    return this.http.post<Stand>(`${this.apiStandsUrl}/create`, stand);
  }

  public updateStand(stand: Stand): Observable<Stand> {
    return this.http.put<Stand>(`${this.apiStandsUrl}/update`, stand);
  }

  public deleteStand(idStand: number): Observable<void> {
    return this.http.delete<void>(`${this.apiStandsUrl}/delete/${idStand}`);
  }
}
