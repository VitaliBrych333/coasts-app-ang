import { Action } from '@ngrx/store';
import { NewCoast } from '../../main/coast.model';

export enum CoastActionTypes {
  ADD_COAST = '[Coast] AddCoast',
  ADD_COAST_SUCCESS = '[Coast] AddCoast Success',
  ADD_COAST_FAILURE = '[Coast] AddCoast Failure',
  CLEAR_STATE_COAST = '[Coast] Clear State Coast',
}

export class AddCoast implements Action {
  readonly type = CoastActionTypes.ADD_COAST;
  constructor(public payload: { newCoast: NewCoast } ) {}
}

export class AddCoastSuccess implements Action {
  readonly type = CoastActionTypes.ADD_COAST_SUCCESS;
  constructor() {}
}

export class AddCoastFailure implements Action {
  readonly type = CoastActionTypes.ADD_COAST_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class ClearStateCoast implements Action {
  readonly type = CoastActionTypes.CLEAR_STATE_COAST;
  constructor() {}
}

export type All =
  | AddCoast
  | AddCoastSuccess
  | AddCoastFailure
  | ClearStateCoast
