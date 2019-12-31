import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NewUser } from '../../log/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { MessageWindowComponent } from '../../shared/message-window/message-window.component';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

import {
  CoastActionTypes,
  AddCoast, AddCoastSuccess, AddCoastFailure,
} from '../actions/coast.actions';

@Injectable()
export class CoastEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private message: MatDialog,
  ) {}

  @Effect()
  LogIn: Observable<object> = this.actions.pipe(
    ofType(CoastActionTypes.ADD_COAST)).pipe(
      map((action: AddCoast) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.authService.login(new NewUser(payload.login, payload.password)))
        .map((res) => {
          return new AddCoastSuccess({ token: res['token'] });
        })
        .catch((err) => {
          return Observable.of(new AddCoastFailure({ error: err }));
        });
      });

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(CoastActionTypes.ADD_COAST_SUCCESS),
    tap((user) => {
      this.authService.setToken(user.payload.token);
      this.authService.changeStatusLog(true);
      this.router.navigate(['/main']);
    })
  );

  // @Effect({ dispatch: false })
  // LogOut: Observable<object> = this.actions.pipe(
  //   ofType(CoastActionTypes.LOGOUT),
  //   tap(() => {
  //     this.authService.deleteToken();
  //     this.router.navigate(['/login']);
  //     this.authService.changeStatusLog(false);
  //   })
  // );

  @Effect({ dispatch: false })
  LogInFailure: Observable<object> = this.actions.pipe(
    ofType(CoastActionTypes.ADD_COAST_FAILURE),
    tap(() => {
      this.message.open(MessageWindowComponent, {
        panelClass: 'my-custom-container',
        data: { content: 'Your login or password is incorrect', class: 'error', time: 1200 }
      });
    })
  );
}
