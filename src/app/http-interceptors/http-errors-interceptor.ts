import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.name + ': ' + error.message);

        if (error.status == 400) {
          for (let key in error.error) {
            alert(`${key}: ${error.error[key]}`);
          }
        }

        if (error.status == 500) {
          alert('500: Erro interno do servidor');
        }

        return throwError(() => error);
      })
    );
  }
}
