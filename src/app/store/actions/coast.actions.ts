import { Action } from '@ngrx/store';
import { NewCoast } from '../../main/coast.model';

export enum CoastActionTypes {
  ADD_COAST = '[Coast] AddCoast',
  ADD_COAST_SUCCESS = '[Coast] AddCoast Success',
  ADD_COAST_FAILURE = '[Coast] AddCoast Failure',
  CLEAR_STATE_COAST = '[Coast] Clear State Coast',
  LOAD_COASTS = '[Coast] LoadCoasts',
  LOAD_COASTS_SUCCESS = '[Coast] LoadCoasts Success',
  LOAD_COASTS_FAILURE = '[Coast] LoadCoasts Failure',
}

export class AddCoast implements Action {
  readonly type = CoastActionTypes.ADD_COAST;
  constructor(public payload: { newCoast: NewCoast }) {}
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

export class LoadCoasts implements Action {
  readonly type = CoastActionTypes.LOAD_COASTS;
  constructor() {}
}

export class LoadSuccess implements Action {
  readonly type = CoastActionTypes.LOAD_COASTS_SUCCESS;
  constructor(public payload: { coasts: NewCoast[] }) {}
}

export class LoadFailure implements Action {
  readonly type = CoastActionTypes.LOAD_COASTS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type All =
  | AddCoast
  | AddCoastSuccess
  | AddCoastFailure
  | ClearStateCoast
  | LoadCoasts
  | LoadSuccess
  | LoadFailure
