// import { Injectable } from '@angular/core';
// import { Action } from '@ngrx/store';
// import { Router } from '@angular/router';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/catch';
// import { tap } from 'rxjs/operators';
// import { map } from "rxjs/operators";

// import { DataService } from '../../breadcrumbs/data.service';

// // import { AuthServiceService } from '../../breadcrumbs/auth-service.service';
// import {
//   AuthActionTypes,
//   LogIn, LoadMoreSuccess, LogInFailure, LoadMore, UpdateCourse
// } from '../actions/user.actions';

// @Injectable()
// export class CoursesEffects {

//   constructor(
//     private actions: Actions,
//     // private authService: AuthServiceService,
//     private router: Router,
//     private dataService: DataService,
//   ) {}

//   @Effect()
// LoadMore: Observable<any> = this.actions.pipe(
//   ofType(AuthActionTypes.LOAD_MORE)).pipe(
//   map((action: LoadMore) => action.payload))
//   .switchMap(payload => {
//     return this.dataService.getList(payload.count)
//       .map((coursesArray) => {
//         return new LoadMoreSuccess({coursesArray});
//       })
//       .catch((error) => {
//         console.log(error);
//         return Observable.of(new LogInFailure({ error: error }));
//       });
//   });

// //   @Effect()
// // EditCourse: Observable<any> = this.actions.pipe(
// //   ofType(AuthActionTypes.EDIT_COURSE)).pipe(
// //   map((action: EditCourse) => action.payload))
// //   .switchMap(payload => {
// //     // return new UpdateCourse({payload})

// //     return this.dataService.getList(payload.count)
// //       .map((coursesArray) => {
// //         return new LoadMoreSuccess({coursesArray});
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         return Observable.of(new LogInFailure({ error: error }));
// //       });
// //   });

// // @Effect({ dispatch: false })
// // EditCourse: Observable<any> = this.actions.pipe(
// //   ofType(AuthActionTypes.EDIT_COURSE),
// //   tap((obj) => {

// //      return new UpdateCourse({obj})
// //      console.log(new UpdateCourse({obj}))

// //     // console.log(obj.payload)
// //     // localStorage.setItem('token', user.payload.token);
// //     // this.router.navigateByUrl('/');
// //   })
// // );

// // @Effect({ dispatch: false })
// // LogOut: Observable<any> = this.actions.pipe(
// //   ofType(AuthActionTypes.LOGOUT),
// //   tap(() => {
// //     this.authService.changeMessage(false);
// //     this.authService.logOut();
// //   })
// // );

// // @Effect({ dispatch: false })
// // LogInFailure: Observable<any> = this.actions.pipe(
// //   ofType(AuthActionTypes.LOGIN_FAILURE)
// // );





// }



