import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NewUser } from '../../log/user.model';
import { AuthService } from '../../services/auth.service';
import { MessageWindowComponent } from '../../shared/components/message-window/message-window.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {
  RegistrActionTypes,
  RegIn, RegInSuccess, RegInFailure,
} from '../actions/registr.actions';

@Injectable()
export class RegistrEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private message: MatDialog,
  ) {}

  @Effect()
  RegIn: Observable<object> = this.actions.pipe(
    ofType(RegistrActionTypes.REGIN)).pipe(
      map((action: RegIn) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.authService.register(new NewUser(payload.login, payload.password)))
        .map((res) => {
          return new RegInSuccess({ login: res['login'] });
        })
        .catch((err) => {
          return Observable.of(new RegInFailure({ error: err }));
        });
      });

  @Effect({ dispatch: false })
  RegInSuccess: Observable<any> = this.actions.pipe(
    ofType(RegistrActionTypes.REGIN_SUCCESS),
    tap((user) => {
      this.message.open(MessageWindowComponent, {
        panelClass: 'my-custom-container',
        data: { content: `Registration completed successfully. Now ${user.payload.login} log in.`, class: 'success', time: 1200 }
      });
    })
  );

  @Effect({ dispatch: false })
  RegInFailure: Observable<object> = this.actions.pipe(
    ofType(RegistrActionTypes.REGIN_FAILURE),
    tap(() => {
      this.message.open(MessageWindowComponent, {
        panelClass: 'my-custom-container',
        data: { content: 'Duplicate login or registration error', class: 'error', time: 1200 }
      });
    })
  );
}
