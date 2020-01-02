import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { NewIncome } from '../../main/income.model';
// import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import {
  IncomeActionTypes,
  AddIncome, AddIncomeSuccess, AddIncomeFailure, LoadSuccess, LoadFailure
} from '../actions/income.actions';

@Injectable()
export class IncomeEffects {

  constructor(
    private actions: Actions,
    private dataService: DataService,
  ) {}

  @Effect()
  AddIncome: Observable<object> = this.actions.pipe(
    ofType(IncomeActionTypes.ADD_INCOME)).pipe(
      map((action: AddIncome) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.dataService.addFieldIncome(payload.newIncome))
        .map((res) => {
          return new AddIncomeSuccess();
        })
        .catch((err) => {
          return Observable.of(new AddIncomeFailure({ error: err }));
        });
      });

  @Effect()
  LoadIncomes: Observable<object> = this.actions.pipe(
    ofType(IncomeActionTypes.LOAD_INCOMES),
    switchMap(() =>
      Observable.fromPromise(this.dataService.getAllFieldsIncomes()).pipe(
        map((res: NewIncome[]) => new LoadSuccess({ incomes: res })),
        catchError(err => of(new LoadFailure({ error: err }))),
      ),
    ),
  );
}
