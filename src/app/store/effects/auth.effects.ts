import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import { tap, map } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { NewUser } from '../../log/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService  } from '../../services/auth.service';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
// import { LoginComponent } from '../../log/login/login.component';

import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
} from '../actions/user.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private message: MatDialog,
    // private loginComponent: LoginComponent
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN)).pipe(
      map((action: LogIn) => action.payload))
      .switchMap(payload => {
        return this.authService.login(new NewUser(payload.login.value, payload.password.value))
      })
      .map(res => {
        return new LogInSuccess({token: res['token']});
      })
      .catch(err => Observable.of(new LogInFailure({ error: err })));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.authService.setToken(user.payload.token);
      this.authService.changeStatusLog(true);
      this.router.navigate(['/main']);
    })
  );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.deleteToken();
      this.router.navigate(['/login']);
      this.authService.changeStatusLog(false);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    // tap(() => {
    //   // this.loginComponent.setForm();
    //   this.message.open(MessageWindowComponent, {
    //     panelClass: 'my-custom-container',
    //     data: {content: 'Your login or password is incorrect', class: 'error', time: 1200}
    //   });
    // })
  );
}



