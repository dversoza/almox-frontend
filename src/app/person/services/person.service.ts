import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Person, DjangoPaginatedResponse, DjangoRequestOptionsList } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiPersonsUrl: string = `${environment.apiBaseUrl}/persons`;

  constructor(private http: HttpClient) {}

  public getAllPersons(options: DjangoRequestOptionsList = {}): Observable<Person[]> {
    if (!options.params?.query) {
      delete options.params?.query;
    }
    return this.http
      .get<DjangoPaginatedResponse<Person>>(`${this.apiPersonsUrl}/`, options)
      .pipe(map((response) => response.results));
  }

  public getPerson(idPerson: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiPersonsUrl}/${idPerson}`);
  }

  public createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiPersonsUrl}/`, {
      ...person,
      stand_id: person.stand?.id,
    });
  }

  public updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiPersonsUrl}/${person.id}/`, {
      ...person,
      stand_id: person.stand?.id,
    });
  }

  public deletePerson(idPerson: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPersonsUrl}/${idPerson}`);
  }
}
