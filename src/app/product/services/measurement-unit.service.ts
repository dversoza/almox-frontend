import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DjangoPaginatedResponse, MeasurementUnit } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeasurementUnitService {
  private apiMeasurementUnitsUrl: string = `${environment.apiBaseUrl}/measurement-units`;

  constructor(private http: HttpClient) { }

  public findAllMeasurementUnits(page: number = 1): Observable<MeasurementUnit[]> {
    return this.http.get<DjangoPaginatedResponse<MeasurementUnit>>(`${this.apiMeasurementUnitsUrl}/`, {
      params: {
        page: page.toString()
      },
    }).pipe(
      map(response => response.results)
    );
  }

  public createMeasurementUnit(measurementUnit: MeasurementUnit): Observable<MeasurementUnit> {
    return this.http.post<MeasurementUnit>(`${this.apiMeasurementUnitsUrl}/create/`, measurementUnit);
  }

  public updateMeasurementUnit(measurementUnit: MeasurementUnit): Observable<MeasurementUnit> {
    return this.http.put<MeasurementUnit>(`${this.apiMeasurementUnitsUrl}/`, measurementUnit);
  }

  public deleteMeasurementUnit(id: number): Observable<MeasurementUnit> {
    return this.http.delete<MeasurementUnit>(`${this.apiMeasurementUnitsUrl}/delete/${id}`);
  }
}
