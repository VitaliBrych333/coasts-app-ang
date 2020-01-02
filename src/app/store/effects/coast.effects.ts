import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { NewCoast } from '../../main/coast.model';
// import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import {
  CoastActionTypes,
  AddCoast, AddCoastSuccess, AddCoastFailure, LoadSuccess, LoadFailure
} from '../actions/coast.actions';

@Injectable()
export class CoastEffects {

  constructor(
    private actions: Actions,
    private dataService: DataService,
  ) {}

  @Effect()
  AddCoast: Observable<object> = this.actions.pipe(
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

  @Effect()
  LoadCoasts: Observable<object> = this.actions.pipe(
    ofType(CoastActionTypes.LOAD_COASTS),
    switchMap(() =>
      Observable.fromPromise(this.dataService.getAllFieldsCoasts()).pipe(
        map((res: NewCoast[]) => new LoadSuccess({ coasts: res })),
        catchError(err => of(new LoadFailure({ error: err }))),
      ),
    ),
  );
}
