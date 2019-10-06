import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthService,
              private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const clonedreq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
    return next.handle(clonedreq).pipe(
            tap(
              event => {},
              err => {
                      if (err.error.auth === false) {
                        this.router.navigate(['/login']);
                      }
            }));
  }
}
