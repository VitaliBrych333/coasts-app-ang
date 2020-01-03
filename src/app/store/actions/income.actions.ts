import { Action } from '@ngrx/store';
import { NewIncome } from '../../main/income.model';

export enum IncomeActionTypes {
  ADD_INCOME = '[Income] AddIncome',
  ADD_INCOME_SUCCESS = '[Income] AddIncome Success',
  ADD_INCOME_FAILURE = '[Income] AddIncome Failure',

  CLEAR_STATE_INCOME = '[Income] Clear State Income',

  LOAD_INCOMES = '[Income] LoadIncomes',
  LOAD_INCOMES_SUCCESS = '[Income] LoadIncomes Success',
  LOAD_INCOMES_FAILURE = '[Income] LoadIncomes Failure',

  LOAD_INCOME_BY_ID = '[Income] LoadIncomeById',
  LOAD_INCOME_BY_ID_SUCCESS = '[Income] LoadIncomeById Success',
  LOAD_INCOME_BY_ID_FAILURE = '[Income] LoadIncomeById Failure',

  UPDATE_INCOME = '[Income] UpdateIncome',
  UPDATE_INCOME_SUCCESS = '[Income] UpdateIncome Success',
  UPDATE_INCOME_FAILURE = '[Income] UpdateIncome Failure',
}

export class AddIncome implements Action {
  readonly type = IncomeActionTypes.ADD_INCOME;
  constructor(public payload: { newIncome: NewIncome }) {}
}

export class AddIncomeSuccess implements Action {
  readonly type = IncomeActionTypes.ADD_INCOME_SUCCESS;
  constructor() {}
}

export class AddIncomeFailure implements Action {
  readonly type = IncomeActionTypes.ADD_INCOME_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class ClearStateIncome implements Action {
  readonly type = IncomeActionTypes.CLEAR_STATE_INCOME;
  constructor() {}
}

export class LoadIncomes implements Action {
  readonly type = IncomeActionTypes.LOAD_INCOMES;
  constructor() {}
}

export class LoadSuccess implements Action {
  readonly type = IncomeActionTypes.LOAD_INCOMES_SUCCESS;
  constructor(public payload: { incomes: NewIncome[] }) {}
}

export class LoadFailure implements Action {
  readonly type = IncomeActionTypes.LOAD_INCOMES_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadIncomeById implements Action {
  readonly type = IncomeActionTypes.LOAD_INCOME_BY_ID;
  constructor(public payload: { Id: string }) {}
}

export class LoadIncomeByIdSuccess implements Action {
  readonly type = IncomeActionTypes.LOAD_INCOME_BY_ID_SUCCESS;
  constructor(public payload: { incomeById: NewIncome }) {}
}

export class LoadIncomeByIdFailure implements Action {
  readonly type = IncomeActionTypes.LOAD_INCOME_BY_ID_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateIncome implements Action {
  readonly type = IncomeActionTypes.UPDATE_INCOME;
  constructor(public payload: { Id: string, newValueIncome: NewIncome }) {}
}

export class UpdateIncomeSuccess implements Action {
  readonly type = IncomeActionTypes.UPDATE_INCOME_SUCCESS;
  constructor() {}
}

export class UpdateIncomeFailure implements Action {
  readonly type = IncomeActionTypes.UPDATE_INCOME_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type All =
  | AddIncome
  | AddIncomeSuccess
  | AddIncomeFailure
  | ClearStateIncome
  | LoadIncomes
  | LoadSuccess
  | LoadFailure
  | LoadIncomeById
  | LoadIncomeByIdSuccess
  | LoadIncomeByIdFailure
  | UpdateIncome
  | UpdateIncomeSuccess
  | UpdateIncomeFailure;
