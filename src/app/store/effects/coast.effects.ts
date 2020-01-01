import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
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
    private dataService: DataService,
  ) {}

  @Effect()
  LogIn: Observable<object> = this.actions.pipe(
    ofType(CoastActionTypes.ADD_COAST)).pipe(
      map((action: AddCoast) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.dataService.addField(payload.newCoast))
        .map((res) => {
          return new AddCoastSuccess();
        })
        .catch((err) => {
          return Observable.of(new AddCoastFailure({ error: err }));
        });
      });

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(CoastActionTypes.ADD_COAST_SUCCESS)
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<object> = this.actions.pipe(
    ofType(CoastActionTypes.ADD_COAST_FAILURE)
  );
}
