import { createFeatureSelector } from '@ngrx/store';
import * as auth from '../reducers/auth.reducer';
import * as registr from '../reducers/registr.reducer';
import * as coast from '../reducers/coast.reducer';
import * as income from '../reducers/income.reducer';

export interface AppState {
  authState?: auth.AuthState;
  registrState?: registr.RegistrState;
  coastState?: coast.CoastState;
  incomeState?: income.IncomeState;
}

export const selectAuthState = createFeatureSelector<AppState>('authState');
export const selectRegistrState = createFeatureSelector<AppState>('registrState');
export const selectCoastState = createFeatureSelector<AppState>('coastState');
export const selectIncomeState = createFeatureSelector<AppState>('incomeState');
