import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { NewIncome } from '../../shared/models/income.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {
  IncomeActionTypes,
  AddIncome, AddIncomeSuccess, AddIncomeFailure,
  LoadSuccess, LoadFailure,
  LoadIncomeById, LoadIncomeByIdSuccess, LoadIncomeByIdFailure,
  UpdateIncome, UpdateIncomeSuccess, UpdateIncomeFailure,
  DeleteIncome, DeleteIncomeSuccess, DeleteIncomeFailure
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
        catchError(err => Observable.of(new LoadFailure({ error: err }))),
      ),
    ),
  );

  @Effect()
  LoadIncomeById: Observable<object> = this.actions.pipe(
    ofType(IncomeActionTypes.LOAD_INCOME_BY_ID)).pipe(
      map((action: LoadIncomeById) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.dataService.getFieldIncomeId(payload.Id))
        .map((res) => {
          return new LoadIncomeByIdSuccess({ incomeById: res });
        })
        .catch((err) => {
          return Observable.of(new LoadIncomeByIdFailure({ error: err }));
        });
      });

  @Effect()
  UpdateIncome: Observable<object> = this.actions.pipe(
    ofType(IncomeActionTypes.UPDATE_INCOME)).pipe(
      map((action: UpdateIncome) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.dataService.updateFieldIncome(payload.Id, payload.newValueIncome))
        .map((res) => {
          return new UpdateIncomeSuccess({ newValueIncome: payload.newValueIncome });
        })
        .catch((err) => {
          return Observable.of(new UpdateIncomeFailure({ error: err }));
        });
      });

  @Effect()
  DeleteIncome: Observable<object> = this.actions.pipe(
    ofType(IncomeActionTypes.DELETE_INCOME)).pipe(
      map((action: DeleteIncome) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.dataService.deleteIncomeId(payload.incomeDel))
        .map((res) => {
          return new DeleteIncomeSuccess();
        })
        .catch((err) => {
          return Observable.of(new DeleteIncomeFailure({ error: err }));
        });
      });
}
