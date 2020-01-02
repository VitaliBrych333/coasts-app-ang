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

export type All =
  | AddIncome
  | AddIncomeSuccess
  | AddIncomeFailure
  | ClearStateIncome
  | LoadIncomes
  | LoadSuccess
  | LoadFailure
