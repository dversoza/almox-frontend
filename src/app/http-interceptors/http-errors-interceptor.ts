import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.name + ': ' + error.message);
        for (let key in error.error) {
          alert(`${key}: ${error.error[key]}`);
        }
        return throwError(() => error);
      }
      ));
       }
}
