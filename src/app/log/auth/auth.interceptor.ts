import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Url } from '../../shared/constants/url-enum';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthService,
              private router: Router) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedreq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
    return next.handle(clonedreq).pipe(
            tap(
              event => {},
              err => {
                      if (err.error.auth === false) {
                        this.router.navigate([Url.LOGIN]);
                      }
            }));
  }
}
