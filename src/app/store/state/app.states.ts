import { createFeatureSelector } from '@ngrx/store';
import * as auth from '../reducers/auth.reducer';
import * as registr from '../reducers/registr.reducer';
import * as coast from '../reducers/coast.reducer';
// import * as listCourses from '../reducers/courses.reducers';


export interface AppState {
  authState?: auth.AuthState;
  registrState?: registr.RegistrState;
  coastState?: coast.CoastState;
  // coursesState?: listCourses.StateCourses;
  // editCourse?: listCourses.StateCourses;
}

// export const reducers = {
//   auth: auth.reducer
// };

// export const reduserCourses = {
//   reducerCoursesList: listCourses.reducerCoursesList
// }
export const selectAuthState = createFeatureSelector<AppState>('authState');
export const selectRegistrState = createFeatureSelector<AppState>('registrState');
export const selectCoastState = createFeatureSelector<AppState>('coastState');
