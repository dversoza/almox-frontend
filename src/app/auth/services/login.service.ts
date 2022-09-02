import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared';
import { Login } from 'src/app/shared/models/login.model';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string;
  user: User;
  email: string;
}

const TOKEN_STORAGE_KEY = 'authToken';
const USER_STORAGE_KEY = 'authUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiAuthUrl: string = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  public login(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiAuthUrl}/login/`, login);
  }

  public logout(): void {
    this.http.get(`${this.apiAuthUrl}/logout/`);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  public getToken(): string {
    if (this.isLoggedIn()) {
      return localStorage.getItem(TOKEN_STORAGE_KEY) as string;
    }
    return '';
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }

  public getUser(): User | null {
    let user = localStorage[USER_STORAGE_KEY];
    return user ? JSON.parse(localStorage[USER_STORAGE_KEY]) : null;
  }

  public setUser(user: User | null) {
    localStorage[USER_STORAGE_KEY] = JSON.stringify(user);
  }

}
