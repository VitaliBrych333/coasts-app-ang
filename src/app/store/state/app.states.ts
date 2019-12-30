import { createFeatureSelector } from '@ngrx/store';
import * as auth from '../reducers/auth.reducers';
import * as registr from '../reducers/registr.reducers';
// import * as listCourses from '../reducers/courses.reducers';


export interface AppState {
  authState?: auth.AuthState;
  registrState?: registr.RegistrState;
  // coursesState?: listCourses.StateCourses;
  // editCourse?: listCourses.StateCourses;
}

// export const reducers = {
//   auth: auth.reducer
// };

// export const reduserCourses = {
//   reducerCoursesList: listCourses.reducerCoursesList
// }
export const selectRegistrState = createFeatureSelector<AppState>('registrState');
export const selectAuthState = createFeatureSelector<AppState>('authState');
