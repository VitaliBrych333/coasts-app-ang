import { Action } from '@ngrx/store';
import { NewUser } from '../../log/user.model';

export enum CoastActionTypes {
  ADD_COAST = '[Coast] AddCoast',
  ADD_COAST_SUCCESS = '[Coast] AddCoast Success',
  ADD_COAST_FAILURE = '[Coast] AddCoast Failure',
  // LOGOUT = '[Auth] Logout',
  // LOAD_MORE = '[Course] LoadMore',
  // LOAD_MORE_SUCCESS = '[Course] LoadMoreSucces',
  // ADD_COURSE = '[Course] ADDCourse',
  // UPDATE_COURSE = '[Course] UpdateCourse'

}

export class AddCoast implements Action {
  readonly type = CoastActionTypes.ADD_COAST;
  constructor(public payload: any) {}
}

export class AddCoastSuccess implements Action {
  readonly type = CoastActionTypes.ADD_COAST_SUCCESS;
  constructor(public payload: any) {}
}

export class AddCoastFailure implements Action {
  readonly type = CoastActionTypes.ADD_COAST_FAILURE;
  constructor(public payload: any) {}
}

// export class LogOut implements Action {
//   readonly type = AuthActionTypes.LOGOUT;
//   constructor() {}
// }

// export class LoadMore implements Action {
//   readonly type = AuthActionTypes.LOAD_MORE;
//   constructor(public payload: any) {}
// }

// export class LoadMoreSuccess implements Action {
//   readonly type = AuthActionTypes.LOAD_MORE_SUCCESS;
//   constructor(public payload: any) {}
// }

// export class AddCourse implements Action {
//   readonly type = AuthActionTypes.ADD_COURSE;
//   constructor(public payload: any) {}
// }

// export class UpdateCourse implements Action {
//   readonly type = AuthActionTypes.UPDATE_COURSE;
//   constructor(public payload: any) {}
// }


export type All =
  | AddCoast
  | AddCoastSuccess
  | AddCoastFailure
  // | LogOut;
  // | LoadMore
  // | LoadMoreSuccess
  // | AddCourse
  // | UpdateCourse
