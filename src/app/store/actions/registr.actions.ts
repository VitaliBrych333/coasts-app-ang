import { Action } from '@ngrx/store';
import { NewUser } from '../../log/user.model';

export enum RegistrActionTypes {
  REGIN = '[Registr] Regin',
  REGIN_SUCCESS = '[Registr] Regin Success',
  REGIN_FAILURE = '[Registr] Regin Failure',
}

export class RegIn implements Action {
  readonly type = RegistrActionTypes.REGIN;
  constructor(public payload: NewUser) {}
}

export class RegInSuccess implements Action {
  readonly type = RegistrActionTypes.REGIN_SUCCESS;
  constructor(public payload: { login: string }) {}
}

export class RegInFailure implements Action {
  readonly type = RegistrActionTypes.REGIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type All =
  | RegIn
  | RegInSuccess
  | RegInFailure;
