import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NewUser } from '../../log/user.model';
import { AuthService } from '../../services/auth.service';
import { MessageWindowComponent } from '../../shared/components/message-window/message-window.component';
import { Url } from '../../shared/constants/url.enum';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private message: MatDialog,
  ) {}

  @Effect()
  LogIn: Observable<object> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN)).pipe(
      map((action: LogIn) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.authService.login(new NewUser(payload.login, payload.password)))
        .map((res) => {
          return new LogInSuccess({ token: res['token'] });
        })
        .catch((err) => {
          return Observable.of(new LogInFailure({ error: err }));
        });
      });

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.authService.setToken(user.payload.token);
      this.authService.changeStatusLog(true);
      this.router.navigate([Url.MAIN]);
    })
  );

  @Effect({ dispatch: false })
  LogOut: Observable<object> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.deleteToken();
      this.router.navigate([Url.LOGIN]);
      this.authService.changeStatusLog(false);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<object> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap(() => {
      this.message.open(MessageWindowComponent, {
        panelClass: 'my-custom-container',
        data: { content: 'Your login or password is incorrect', class: 'error', time: 1200 }
      });
    })
  );
}
