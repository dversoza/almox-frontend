import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/shared/models/person.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiPersonsUrl: string = `${environment.apiBaseUrl}/persons`;

  constructor(private http: HttpClient) { }

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiPersonsUrl}`);
  }

  public criarPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiPersonsUrl}/create`, person);
  }

  public atualizarPerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiPersonsUrl}/update`, person);
  }

  public excluirPerson(idPerson: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPersonsUrl}/delete/${idPerson}`);
  }
}
