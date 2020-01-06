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

  LOAD_COAST_BY_ID = '[Coast] LoadCoastById',
  LOAD_COAST_BY_ID_SUCCESS = '[Coast] LoadCoastById Success',
  LOAD_COAST_BY_ID_FAILURE = '[Coast] LoadCoastById Failure',

  UPDATE_COAST = '[Coast] UpdateCoast',
  UPDATE_COAST_SUCCESS = '[Coast] UpdateCoast Success',
  UPDATE_COAST_FAILURE = '[Coast] UpdateCoast Failure',

  DELETE_COAST = '[Coast] DeleteCoast',
  DELETE_COAST_SUCCESS = '[Coast] DeleteCoast Success',
  DELETE_COAST_FAILURE = '[Coast] DeleteCoast Failure',
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

export class LoadCoastById implements Action {
  readonly type = CoastActionTypes.LOAD_COAST_BY_ID;
  constructor(public payload: { Id: string }) {}
}

export class LoadCoastByIdSuccess implements Action {
  readonly type = CoastActionTypes.LOAD_COAST_BY_ID_SUCCESS;
  constructor(public payload: { coastById: NewCoast }) {}
}

export class LoadCoastByIdFailure implements Action {
  readonly type = CoastActionTypes.LOAD_COAST_BY_ID_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateCoast implements Action {
  readonly type = CoastActionTypes.UPDATE_COAST;
  constructor(public payload: { Id: string, newValueCoast: NewCoast }) {}
}

export class UpdateCoastSuccess implements Action {
  readonly type = CoastActionTypes.UPDATE_COAST_SUCCESS;
  constructor() {}
}

export class UpdateCoastFailure implements Action {
  readonly type = CoastActionTypes.UPDATE_COAST_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class DeleteCoast implements Action {
  readonly type = CoastActionTypes.DELETE_COAST;
  constructor(public payload: { coastDel: NewCoast }) {}
}

export class DeleteCoastSuccess implements Action {
  readonly type = CoastActionTypes.DELETE_COAST_SUCCESS;
  constructor() {}
}

export class DeleteCoastFailure implements Action {
  readonly type = CoastActionTypes.DELETE_COAST_FAILURE;
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
  | LoadCoastById
  | LoadCoastByIdSuccess
  | LoadCoastByIdFailure
  | UpdateCoast
  | UpdateCoastSuccess
  | UpdateCoastFailure
  | DeleteCoast
  | DeleteCoastSuccess
  | DeleteCoastFailure;
