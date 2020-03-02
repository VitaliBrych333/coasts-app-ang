import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { NewCoast } from '../../shared/models/coast.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {
  CoastActionTypes,
  AddCoast, AddCoastSuccess, AddCoastFailure,
  LoadSuccess, LoadFailure,
  LoadCoastById, LoadCoastByIdSuccess, LoadCoastByIdFailure,
  UpdateCoast, UpdateCoastSuccess, UpdateCoastFailure,
  DeleteCoast, DeleteCoastSuccess, DeleteCoastFailure
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
        catchError(err => Observable.of(new LoadFailure({ error: err }))),
      ),
    ),
  );

  @Effect()
  LoadCoastById: Observable<object> = this.actions.pipe(
    ofType(CoastActionTypes.LOAD_COAST_BY_ID)).pipe(
      map((action: LoadCoastById) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.dataService.getFieldId(payload.Id))
        .map((res) => {
          return new LoadCoastByIdSuccess({ coastById: res });
        })
        .catch((err) => {
          return Observable.of(new LoadCoastByIdFailure({ error: err }));
        });
      });

  @Effect()
  UpdateCoast: Observable<object> = this.actions.pipe(
    ofType(CoastActionTypes.UPDATE_COAST)).pipe(
      map((action: UpdateCoast) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.dataService.updateField(payload.Id, payload.newValueCoast))
        .map((res) => {
          return new UpdateCoastSuccess({ newValueCoast: payload.newValueCoast });
        })
        .catch((err) => {
          return Observable.of(new UpdateCoastFailure({ error: err }));
        });
      });

  @Effect()
  DeleteCoast: Observable<object> = this.actions.pipe(
    ofType(CoastActionTypes.DELETE_COAST)).pipe(
      map((action: DeleteCoast) => action.payload))
      .switchMap(payload => {
        return Observable.fromPromise(this.dataService.deleteId(payload.coastDel))
        .map((res) => {
          return new DeleteCoastSuccess();
        })
        .catch((err) => {
          return Observable.of(new DeleteCoastFailure({ error: err }));
        });
      });
}
