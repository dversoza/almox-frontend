import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeasurementUnit } from 'src/app/shared/models/measurement-unit.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeasurementUnitService {
  private apiMeasurementUnitsUrl: string = `${environment.apiBaseUrl}/measurement-units`;

  constructor(private http: HttpClient) { }

  public findAllMeasurementUnits(): Observable<MeasurementUnit[]> {
    return this.http.get<MeasurementUnit[]>(this.apiMeasurementUnitsUrl);
  }

  public createUM(mu: MeasurementUnit): Observable<MeasurementUnit> {
    return this.http.post<MeasurementUnit>(`${this.apiMeasurementUnitsUrl}/create`, mu);
  }

  public updateUM(mu: MeasurementUnit): Observable<MeasurementUnit> {
    return this.http.put<MeasurementUnit>(`${this.apiMeasurementUnitsUrl}/update`, mu);
  }

  public deleteUM(id: number): Observable<MeasurementUnit> {
    return this.http.delete<MeasurementUnit>(`${this.apiMeasurementUnitsUrl}/delete/${id}`);
  }
}
