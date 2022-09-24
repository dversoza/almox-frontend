import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, DjangoPaginatedResponse } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUsersUrl: string = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http
      .get<DjangoPaginatedResponse<User>>(this.apiUsersUrl)
      .pipe(map((response) => response.results));
  }

  public getUser(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.apiUsersUrl}/${idUser}`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUsersUrl}/`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUsersUrl}/${user.id}/`, user);
  }

  public deleteUser(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUsersUrl}/${idUser}`);
  }
}
