import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared';
import { Login } from 'src/app/shared/models/login.model';
import { UserService } from 'src/app/user/services/user.service';

const LOCAL_STORAGE_KEY: string = 'authUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users!: User[];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  public get authUser(): User | null {
    let user = localStorage[LOCAL_STORAGE_KEY];
    return user ? JSON.parse(localStorage[LOCAL_STORAGE_KEY]) : null;
  }

  public set authUser(user: User | null) {
    localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(user);
  }

  logout() {
    delete localStorage[LOCAL_STORAGE_KEY];
  }

  login(login: Login): Observable<User | null> {
    const existingUser = this.users.find(
      (user: User) => user.username === login.username
    );

    if (existingUser && existingUser.password === login.password) {
      this.authUser = existingUser;
      return of(existingUser);
    } else {
      return of(null);
    }
  }
}
