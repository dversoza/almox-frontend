import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const authUser = this.loginService.getUser();
    let url = state.url;
    if (authUser) {
      if (
        route.data.role &&
        route.data.role.indexOf(authUser.is_staff) === true
      ) {
        this.router.navigate(['/login'], {
          queryParams: { error: 'Proibido o acesso a ' + url },
        });
        return false;
      }
      return true;
    }
    this.router.navigate(['/login'], {
      queryParams: { error: 'Faça login para acessar o aplicativo!' },
    });
    return false;
  }
}
