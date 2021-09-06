import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barraca } from 'src/app/shared/models/barraca.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BarracaService {
  private apiBarracasUrl: string = `${environment.apiBaseUrl}/barracas`;

  constructor(private http: HttpClient) {}

  public getBarracas(): Observable<Barraca[]> {
    return this.http.get<Barraca[]>(`${this.apiBarracasUrl}`);
  }

  public getBarracaById(idBarraca: number): Observable<Barraca> {
    return this.http.get<Barraca>(`${this.apiBarracasUrl}/${idBarraca}`);
  }

  public addBarraca(barraca: Barraca): Observable<Barraca> {
    return this.http.post<Barraca>(`${this.apiBarracasUrl}/criar`, barraca);
  }

  public updateBarraca(barraca: Barraca): Observable<Barraca> {
    return this.http.put<Barraca>(`${this.apiBarracasUrl}/editar`, barraca);
  }

  public deleteBarraca(idBarraca: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiBarracasUrl}/excluir/${idBarraca}`
    );
  }
}
