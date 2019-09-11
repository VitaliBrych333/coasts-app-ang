import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authservice: AuthService,
                private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('NoAuth')) {
          return next.handle(req.clone());
        } else {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.authservice.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth === false) {
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}
// https://github.com/CodAffection/MEAN-Stack-Login-and-Logout-in-Angular-6-Part-2/blob/master/Angular%206/src/app/auth/auth.interceptor.ts

// https://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api

// https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial
